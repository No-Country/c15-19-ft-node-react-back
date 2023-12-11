const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const mainRoutes = require("./routes/mainRoutes.js");
const http = require("http");
const configureSocket = require("./socketConfig.js");

const app = express();
app.name = "API";
const server = http.createServer(app);

// Configuracion de Socket.io (IMPORTANTE: debe configurarse luego de crear el servidor http con express)
configureSocket(server);

app.use(express.json());
app.use(morgan("dev"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
    createParentPath: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/", mainRoutes);

// Manejo de Chats con Socket.io

module.exports = server;
