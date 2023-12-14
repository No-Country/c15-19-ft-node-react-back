const { Schema, model } = require("mongoose");

const HashtagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  challenges: [
    {
      type: Schema.Types.ObjectId,
      ref: "Challenge",
    },
  ],
});

module.exports = model("Hashtag", HashtagSchema);
