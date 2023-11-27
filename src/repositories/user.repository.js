const userModel = require("../models/user.model");

const getAllUsers = async () => {
  const newData = await userModel.find();
  if (!newData.length) throw new Error(`No existe el usuario que se busco`)
  return newData;
};

const createUser = async ({ name, email }) => {
  const newUser = await userModel.create({ name, email });
  return newUser;
};

module.exports = {
  getAllUsers,
  createUser
}



