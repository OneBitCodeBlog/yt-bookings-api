const Booking = require("./Booking")

class BookingService {
  constructor(repository) {
    this.repository = repository
  }

  async findAllBookings() {
    return await this.repository.findAll()
  }

  async createBooking({ userId, roomId, guestName, checkInDate, checkOutDate }) {
    const newBooking = new Booking({ userId, roomId, guestName, checkInDate, checkOutDate })

    const allBookings = await this.repository.findAll()

    const overlappingBooking = allBookings.find((booking) => {
      return (
        booking.roomId === newBooking.roomId &&
        booking.checkInDate < newBooking.checkOutDate &&
        booking.checkOutDate > newBooking.checkInDate
      )
    })

    if (overlappingBooking) {
      throw new Error("The room is already booked for the selected dates.")
    }

    await this.repository.create(newBooking)
    return newBooking
  }
}

module.exports = BookingService