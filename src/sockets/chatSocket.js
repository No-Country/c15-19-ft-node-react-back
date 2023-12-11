// chatSocket.js
const { sendMessage } = require("../handlers/chat.handler.js");
function handleChatSocket(io) {
  io.on("connection", (socket) => {
    const { userId } = socket.handshake.query;
    socket.join(userId);
    console.log(`Usuario ${userId} conectado a los eventos de los chats.....`);

    socket.on("sendMessage", async (data) => {
      sendMessage(socket, data);
    });
    socket.on("disconnect", () => {
      console.log(
        `Usuario ${userId} desconectado de los eventos de los chats.....`
      );
    });
  });
}

module.exports = handleChatSocket;
