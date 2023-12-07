const { registerUserController, verifyAccount, authenticateUser } = require('../repositories/auth.repository');

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

const authenticateUserHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await authenticateUser(email, password);

    res.json(userData);
  } catch (error) {
     res.status(400).json({ msg: error.message });
  }
};

const verifyAccountHandler = async (req, res) => {
  try {
    const { token } = req.params;
    const userVerified = await verifyAccount(token);

    res.json({ msg: 'Su cuenta ha sido verificada Exitosamente!!' });
    console.log(userVerified);
  } catch (error) {
    console.log(error);
    res.status(403).json({ msg: error.message });
  }
};

const profile = (req,res) => {
    const { user } = req

    res.json(user)
}


module.exports = {
  registerUserHandler,
  verifyAccountHandler,
  authenticateUserHandler,
  profile
};
