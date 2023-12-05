// controllers/user.controller.js
const  User = require('../models/user.model');
const { generateToken } = require('../helpers/generateToken.js');

const registerUserController = async (userData) => {
  const { email, username } = userData;
  const existingUser = await User.findOne({ email });
  const existingUserName = await User.findOne({ username });

  if (existingUser) {
    throw new Error("Ya hay un registro con este email");
  }

  if (existingUserName) {
    throw new Error("El Username que elegiste para tu cuenta no se encuentra disponible");
  }

  const user = new User(userData);
  user.token = generateToken();
  await user.save();

  // Agregar lógica para enviar el mail de confirmación aquí

  return user;
};

module.exports = {
  registerUserController,
};

