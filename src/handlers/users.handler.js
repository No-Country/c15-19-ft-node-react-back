const { getAllUsers, createUser } = require("../repositories/user.repository")

const getAllUsersHandler = async (req, res) => {
  try {
    const response = await getAllUsers()
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const postUserHandler = async (req, res) => {
  try {
    const { name, email } = req.body
    const response = await createUser(name, email)
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

module.exports = {
  getAllUsersHandler,
  postUserHandler
}