const app = require("./app")

const PORT = process.env.PORT || 3000

const start = () => {
  try {
    app.listen({ port: PORT })
    app.log.info(`Server is running on http://localhost:${PORT}`)
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

start()