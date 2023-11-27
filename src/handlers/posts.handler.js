const { getAllPostsWhithoutUser, createPost, getAllPostsWhithUser, deletePost, updatePost } = require("../repositories/post.repository")

const getAllPostsHandler = async (req, res) => {
  try {
    const response = await getAllPostsWhithoutUser()
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const getAllPostsWhithUserHandler = async (req, res) => {
  try {
    const response = await getAllPostsWhithUser()
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const deleteOnePostHandler = async (req, res) => {
  try {
    const { id } = req.params
    const response = await deletePost(id)
    res.status(200).send(response)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const createPostHandler = async (req, res) => {
  try {
    const { name, description, userId } = req.body
    const response = await createPost(name, description, userId)
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const updatePostHandler = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const response = await updatePost(id, data)
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

module.exports = {
  getAllPostsHandler,
  getAllPostsWhithUserHandler,
  deleteOnePostHandler,
  createPostHandler,
  updatePostHandler
}
