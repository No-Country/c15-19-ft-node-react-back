const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generateJWT.js');

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
  authenticateUser
};

