const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  picture: {
    type: String, //Pensar en usar Buffer
  },
  role: {
    type: String,
    enum: ["admin", "challenger"],
    default: "challenger",
  },
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      followDate: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  following: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      followDate: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  notifications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
  challenges: [
    {
      type: Schema.Types.ObjectId,
      ref: "Challenge",
    },
  ],
  disabled: {
    type: Boolean,
    default: false,
  },
  verificationEmail: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("User", UserSchema);
