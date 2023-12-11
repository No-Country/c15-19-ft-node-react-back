// socketConfig.js
const socketIo = require("socket.io");
const configureChatSocket = require("../src/sockets/chatSocket");

const corsOptions = {
  cors: {
    origin: "http://localhost:5173", // Reemplaza con la URL de tu aplicación frontend
    methods: ["GET", "POST"],
  },
};
function configureSocket(server) {
  const io = socketIo(server, corsOptions);

  // Configurar módulos específicos para chat y notificaciones
  configureChatSocket(io);

  return io;
}

module.exports = configureSocket;
