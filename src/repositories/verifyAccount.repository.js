const User = require('../models/user.model');

const verifyAccount = async (token) => {
  const userVerified = await User.findOne({ token });

  if (!userVerified) throw new Error('Token No Valido');
  
  userVerified.verificationEmail = true;
  userVerified.token = '';
  await userVerified.save();

  return userVerified;
};

module.exports = {
  verifyAccount,
};
