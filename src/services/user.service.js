const userRepository = require("../repositories/user.repository");

exports.getData = async () => {
  try {
    const newData = await userRepository.getAllUsers();
    return newData;
  } catch (error) {
    console.error("Error al obtener datos de la base de datos:", error);
    return false;
  }
};

exports.addUser = async ({ name, email }) => {
  try {
    const newUser = await userRepository.createUser({ name, email });
    return newUser;
  } catch (error) {
    console.error("Error creating a new user:", error);
    return false;
  }
};
