const { authenticateUser } = require('../repositories/login.repository');

const authenticateUserHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await authenticateUser(email, password);

    res.json(userData);
  } catch (error) {
     res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  authenticateUserHandler,
};



