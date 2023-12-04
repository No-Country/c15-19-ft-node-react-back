// handlers/user.handler.js
const { registerUserController } = require('../repositories/register.repository');

const registerUserHandler = async (req, res) => {
  try {
    const userData = req.body;
    await registerUserController(userData);

    res.json({
      msg: "Usuario creado correctamente, hemos enviado un mail a tu casilla de correo para que confirmes tu cuenta, tienes 15 días para hacerlo, de lo contrario deberas hacer el registro nuevamente",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  registerUserHandler,
};
