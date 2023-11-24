const userModel = require("../models/user.model");

// Repositorio para obtener datos de usuarios
exports.getAllUsers = async () => {
  try {
    const newData = await userModel.find();
    return newData;
  } catch (error) {
    console.error("Error al obtener datos de la base de datos:", error);
    throw error; // Puedes manejar el error de otra manera según tus necesidades
  }
};

exports.createUser = async ({ name, email }) => {
  try {
    const newUser = await userModel.create({ name, email });
    return newUser;
  } catch (error) {
    console.error("Error creating a new user:", error);
    throw error; // Puedes manejar el error de otra manera según tus necesidades
  }
};
