const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  name: {
    type: String,
    required: [true, "Why is there no name?"],
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = model("Post", PostSchema);
