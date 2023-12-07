// controllers/user.controller.js
const  User = require('../models/user.model');
const { generateToken, generateJWT } = require('../helpers/tokens');
const {emailVerifyAccount} = require('../helpers/sendEmail')

const registerUserController = async ( {email, username, name, lastname, password, picture}) => {

    email = email.trim();
    username = username.trim();
    name = name.trim();
    lastname = lastname.trim();  
  
    // Validaciones
    const nameContainsNumber = /\d/.test(name);
    const lastnameContainsNumber = /\d/.test(lastname);   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9]{1,13}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?!\s).+$/;
    const existingUser = await User.findOne({ email });
    const existingUserName = await User.findOne({ username });

    if (!email || !username || !name || !lastname || !password) {
      throw new Error("Todos los campos son obligatorios");
    } 

    if (existingUser) throw new Error("Ya hay un registro con este email");

    if (existingUserName) throw new Error("El Username que elegiste para tu cuenta no se encuentra disponible");

    if (nameContainsNumber || lastnameContainsNumber) {
      throw new Error("El nombre y el apellido no deben contener números");
    } 

    if (!emailRegex.test(email)) throw new Error("Formato de email no válido");

    if (name.length < 2 || lastname.length < 2) {
      throw new Error("El nombre y el apellido deben tener al menos 2 caracteres");
    }

    if (!usernameRegex.test(username) || username.replace(/[0-9]/g, "").length > 8) {
      throw new Error("El username debe tener entre 1 y 13 caracteres, máximo 5 números");
    }

    if (!passwordRegex.test(password))  {
      throw new Error("La contraseña debe contener al menos una mayúscula, un número y no debe contener espacios en blanco");
    }
    
    const user = new User({email, username, name, lastname, password});
    user.token = generateToken();
    await user.save();
  
    // Enviar el correo de confirmación
    emailVerifyAccount({ email: user.email, name: user.name, token: user.token });
  
    // return user;
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

  email = email.trim();
  password = password.trim();

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

