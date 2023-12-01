const server = require("./src/app");
const connDb = require("./src/db");
const { port } = require("./src/config");

server.listen(port, () => {
  connDb();
  console.log(`Server listening on port: ${port}`);
});
