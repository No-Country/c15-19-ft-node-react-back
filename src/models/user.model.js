const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Why is there no name?"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = model("User", UserSchema);
