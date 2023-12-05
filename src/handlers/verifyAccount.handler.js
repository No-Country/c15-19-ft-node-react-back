const { verifyAccount } = require('../repositories/verifyAccount.repository');

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

module.exports = {
  verifyAccountHandler
};
