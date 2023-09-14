const fastify = require("fastify")
const { setupRoutes } = require("./routes")

const app = fastify({ logger: true })

setupRoutes(app)

module.exports = app