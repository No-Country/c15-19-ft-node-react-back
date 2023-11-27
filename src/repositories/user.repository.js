const userModel = require("../models/user.model");

const getAllUsers = async () => {
  const newData = await userModel.find();
  return newData;
};

const createUser = async ({ name, email }) => {
  const newUser = await userModel.create({ name, email });
  return newUser;
};

module.exports = {
  getAllUsers,
  createUser,
};
