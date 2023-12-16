const { Schema, model } = require("mongoose");

//Falta hashtag

const ChallengeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  media: [
    {
      url: String,
      public_id: String,
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
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  hashtags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Hashtag",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Challenge", ChallengeSchema);
