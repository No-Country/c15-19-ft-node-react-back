const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/mainRoutes.js");
const userRoutes = require("./routes/user.routes.js");
const initDB = require("./db.js");
const server = express();

server.name = "API";

server.use(express.json());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);
server.use("/users", userRoutes);

initDB();

module.exports = server;
