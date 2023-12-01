const postModel = require("../models/post.model");
const formatedDate = require("../utils/formatedDate");

const getAllPostsWhithoutUser = async () => {
  const newData = await postModel.find();
  return newData;
};

//muestra de busqueda con el valor del user "relacionado"
const getAllPostsWhithUser = async () => {
  responde.id == ObjectId(id);
  const newData = await postModel
    .find()
    .populate("user", "name email -_id")
    .select("name description createdAt updatedAt user");
  return newData;
};

const createPost = async (name, description, userId) => {
  const newPost = await postModel.create({
    name,
    description,
    createdAt: formatedDate(),
    updatedAt: formatedDate(),
    user: userId,
  });
  return newPost;
};

const deletePost = async (id) => {
  return await postModel.deleteOne({ _id: id });
};

const updatePost = async (id, data) => {
  try {
    const updatedPost = await postModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedPost) {
      throw new Error(`No post found with id: ${id}`);
    }
    return updatedPost;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllPostsWhithoutUser,
  getAllPostsWhithUser,
  createPost,
  deletePost,
  updatePost,
};
