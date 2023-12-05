// controllers/user.controller.js
const  User = require('../models/user.model');
const { generateToken, generateJWT } = require('../helpers/tokens');
const {emailVerifyAccount} = require('../helpers/sendEmail')

const registerUserController = async (userData) => {
  const { email, username } = userData;
  const existingUser = await User.findOne({ email });
  const existingUserName = await User.findOne({ username });

  if (existingUser) throw new Error("Ya hay un registro con este email");

  if (existingUserName) throw new Error("El Username que elegiste para tu cuenta no se encuentra disponible");
  
  const user = new User(userData);
  user.token = generateToken();
  await user.save();

  //enviar el mail de confirmación 
  emailVerifyAccount({ email: user.email, name: user.name,token: user.token })

  return user;
};

const verifyAccount = async (token) => {
  const userVerified = await User.findOne({ token });

  if (!userVerified) throw new Error('Token No Valido');
  
  userVerified.verificationEmail = true;
  userVerified.token = '';
  await userVerified.save();

//   return userVerified;
};

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error('Usuario inexistente');
  if (!user.verificationEmail)  throw new Error('Tu cuenta no ha sido confirmada');
  
  const isPasswordCorrect = await user.checkPassword(password);

  if (isPasswordCorrect) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      jsontoken: generateJWT(user._id),
    };
  } 
  
  else throw new Error('Password Incorrecto');

};

module.exports = {
    registerUserController,
    verifyAccount,
    authenticateUser
};

