const express = require("express");
const fileUpload = require("express-fileupload")
const morgan = require("morgan");
const mainRoutes = require("./routes/mainRoutes.js");
const server = express();
server.name = "API";
const cors = require("cors")

//Configurar CORS
// const whitelist = [process.env.FRONTEND_URL]

// const corsOptions = {
//     origin: function(origin, callback){
//         if(whitelist.includes(origin)) {
//         //Puede consultar la API
//         callback(null, true)
//         } else {
//             //No ésta permitido
//             callback(new Error('Error de Cors'))

//         }
//     }
// }

// server.use(cors(corsOptions))

server.use(express.json());
server.use(morgan("dev"))
server.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./uploads",
  createParentPath: true
}));
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

server.use("/", mainRoutes);

module.exports = server;
