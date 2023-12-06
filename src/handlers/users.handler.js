const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../repositories/user.repository");

const getAllUsersHandler = async (req, res) => {
  try {
    const { name, skip, take } = req.query;

    //Paginacion
    const skipNumber = parseInt(skip, 10) || 0; // Valor predeterminado: 0 para la primera página
    const takeNumber = parseInt(take, 10) || 10; // Valor predeterminado: 10 por página

    const response = await getAllUsers({ name }, skipNumber, takeNumber);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getUserById(id);
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    //Campos que se pueden actualizar en el usuario
    const allowedFields = [
      "name",
      "lastname",
      "email",
      "username",
      "disabled",
      "gender",
    ];

    //Validacion para que no se puedan actualizar campos que no esten en el array allowedFields
    const isValidUpdate = Object.keys(data).every((field) =>
      allowedFields.includes(field)
    );
    //Si no es valido, se retorna un error
    if (!isValidUpdate) {
      return res.status(400).json({ message: "Invalid fields" });
    }

    const response = await updateUserById(id, data);
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }

    //Validacion para cuando un usuario quiera habilitar / deshabilitar su cuenta.
    if (data.disabled) {
      return res.status(200).json({
        message: `User ${
          response.disabled ? "disabled" : "enabled"
        } successfully`,
        response,
      });
    }

    //Si no se deshabilita, se retorna el usuario actualizado
    res.status(200).json({
      message: `User updated successfully`,
      response,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteUserById(id);
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
};
