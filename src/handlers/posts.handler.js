const {
  getAllPostsWhithoutUser,
  createPost,
  getAllPostsWhithUser,
  deletePost,
  updatePost,
} = require("../repositories/post.repository");

const getAllPostsHandler = async (req, res) => {
  try {
    const response = await getAllPostsWhithoutUser();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPostsWhithUserHandler = async (req, res) => {
  try {
    const response = await getAllPostsWhithUser();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPostHandler = async (req, res) => {
  try {
    const { name, description, userId } = req.body;
    if (!name || !description || !userId) {
      res.status(400).json({ error: "Please complete all fields" });
      return;
    }

    const response = await createPost(name, description, userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOnePostHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deletePost(id);
    if (response.deletedCount === 1) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePostHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Lógica de negocio: Verificar si se proporcionaron campos y si no están vacíos
    if (!Object.keys(data).length) {
      res.status(400).json({ error: "Please indicate the fields to modify" });
      return;
    }

    for (const key in data) {
      if (data[key] === undefined || data[key].trim().length === 0) {
        res
          .status(400)
          .json({
            error: "Could not update post, complete all fields please!",
          });
        return;
      }
    }

    const response = await updatePost(id, data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPostsHandler,
  getAllPostsWhithUserHandler,
  deleteOnePostHandler,
  createPostHandler,
  updatePostHandler,
};
