const server = require("./src/app")
const connDb = require("./src/db")

server.listen(3001, () => {
  connDb()
  console.log(`Server listening on port: 3001`)
})