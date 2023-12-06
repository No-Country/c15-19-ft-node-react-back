const server = require("./src/app");
const connDb = require("./src/db");
const { port } = require("./src/config");
const cloudinary = require("./src/utils/cloudinaryConfig")

console.log(cloudinary)

server.listen(port, () => {
  connDb();
  console.log(`Server listening on port: ${port}`);
});
