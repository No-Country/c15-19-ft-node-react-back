const MessageModel = require("../models/message.model");

const sendMessage = async (socket, data) => {
  try {
    const { senderId, receiverId, content } = data;

    const message = await MessageModel.create({
      senderId,
      receiverId,
      content,
    });

    socket.emit("receiveMessage", {
      senderId,
      content: message.content,
      timestamp: message.timestamp,
    });

    socket.to(receiverId).emit("receiveMessage", {
      content: message.content,
      senderId: message.senderId,
    });
    console.log(`Mensaje enviado de ${senderId} a ${receiverId}: ${content}`);
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
  }
};

module.exports = {
  sendMessage,
};
