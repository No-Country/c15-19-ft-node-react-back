const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  challenge: {
    type: Schema.Types.ObjectId,
    ref: "Challenge",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  media: [
    {
      url: String,
      typeFile: {
        type: String,
        enum: ["image", "video"],
        required: true,
      },
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Comment", CommentSchema);
