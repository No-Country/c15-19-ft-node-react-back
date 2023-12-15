const {
  registerUserController,
  verifyAccount,
  authenticateUser,
} = require("../repositories/auth.repository");

const registerUserHandler = async (req, res) => {
  try {
    const userData = req.body;
    await registerUserController(userData);

    res.json({
      message:
        "Usuario registrado exitosamente, por favor revise su correo para verificar su cuenta",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const authenticateUserHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await authenticateUser(email, password);

    res.json(userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const verifyAccountHandler = async (req, res) => {
  try {
    const { token } = req.params;
    const userVerified = await verifyAccount(token);

    res.json({ message: "Su cuenta ha sido verificada Exitosamente!!" });
    console.log(userVerified);
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: error.message });
  }
};

const profile = (req, res) => {
  const { user } = req;

  res.json(user);
};

module.exports = {
  registerUserHandler,
  verifyAccountHandler,
  authenticateUserHandler,
  profile,
};
