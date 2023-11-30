const { Schema, model } = require("mongoose");

//Falta hashtag

const ChallengeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  media: [{
    url: {
      type: String,
      required: true
    },
    type: {
      enum: ["image", "video"],
      required: true
    },
    required: true
  }],
  likes: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  createdAt: {
    type: Date,
    default: new Date.now()
  },
  updatedAt: {
    type: Date,
    default: new Date.now()
  }
})

module.exports = model("Challenge", ChallengeSchema)