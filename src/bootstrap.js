const BookingPostgreRepository = require("./bookings/BookingPostgreRepository")
const UserPostgreRepository = require("./auth/UserPostgreRepository")
const BookingService = require("./bookings/BookingService")
const AuthService = require("./auth/AuthService")
const BookingController = require("./bookings/BookingController")
const AuthController = require("./auth/AuthController")

const bookingRepository = new BookingPostgreRepository()
const userRepository = new UserPostgreRepository();
const bookingService = new BookingService(bookingRepository)
const authService = new AuthService(userRepository);
const bookingController = new BookingController(bookingService)
const authController = new AuthController(authService);

module.exports = {
    bookingRepository,
    userRepository,
    bookingService,
    authService,
    bookingController,
    authController
}