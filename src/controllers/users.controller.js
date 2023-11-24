const userService = require("../services/user.service");

exports.getData = async (req, res) => {
  try {
    const newData = await userService.getData();
    res.json({ success: true, data: newData });
  } catch (error) {
    console.error("Error al obtener datos de la base de datos:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener datos de la base de datos",
    });
  }
};
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required.",
      });
    }

    // Validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "The format of the email is invalid.",
      });
    }

    const newUser = await userService.addUser({ name, email });
    res.status(201).json({
      success: true,
      data: newUser,
      message: "User created successfully.",
    });
  } catch (error) {
    console.error("Error creating a new user:", error);
    res.status(500).json({
      success: false,
      message: "Error creating a new user.",
    });
  }
};
