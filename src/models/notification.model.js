const { Schema, model } = require("mongoose");

const NotificationSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Notification", NotificationSchema);
