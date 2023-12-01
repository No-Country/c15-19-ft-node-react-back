const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  challenges: [{
    type: Schema.Types.ObjectId,
    ref: "Challenge"
  }],
});

module.exports = model("Category", CategorySchema);
