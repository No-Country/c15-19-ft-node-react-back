const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

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
  token: {
    type: String
  }
}, 


);

UserSchema.pre('save', async function(next){
  //Verifica si password ha sido modificado. Si no ha sido verificado llama a next() para pasar alsiguiente proceso
  if(!this.isModified('password')) {
      next()
  }

  //Si el password ha sido modificado genera una cadena aleatoria(salt) y luego es hasheado para encriptar dicho password
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Comparamos la contraseña que insertamos en el form y devuelve true o false según coincida o no
UserSchema.methods.checkPassword = async function(passwordForm) {
  return await bcrypt.compare (passwordForm, this.password)
}

module.exports = model("User", UserSchema);
