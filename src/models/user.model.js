const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

module.ewxports = model("User", UserSchema);
