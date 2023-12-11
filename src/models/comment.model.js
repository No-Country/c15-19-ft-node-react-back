const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: "User" },
  receiverId: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = model("Message", MessageSchema);
