// models/message.model.js
const { model, Schema } = require("mongoose");

const messageSchema = new Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = model("Message", messageSchema);
