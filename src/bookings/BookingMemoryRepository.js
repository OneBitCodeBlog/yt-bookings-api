class BookingMemoryRepository {
  constructor() {
    this.bookings = []
  }

  findAll() {
    return this.bookings
  }

  create(booking) {
    this.bookings.push(booking)
  }
}

module.exports = BookingMemoryRepository