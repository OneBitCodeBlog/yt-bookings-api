const fastify = require("fastify")
const BookingRepository = require("./bookings/BookingRepository")
const BookingService = require("./bookings/BookingService")
const BookingController = require("./bookings/BookingController")

const app = fastify({ logger: true })

const bookingRepository = new BookingRepository()
const bookingService = new BookingService(bookingRepository)
const bookingController = new BookingController(bookingService)

app.get("/hello", (request, reply) => {
  reply.send({ message: "Hello, world!!" })
})

app.get("/api/bookings", (request, reply) => {
  const { code, body } = bookingController.index(request)
  reply.code(code).send(body)
})

app.post("/api/bookings", (request, reply) => {
  const { code, body } = bookingController.save(request)
  reply.code(code).send(body)
})

module.exports = app