const postModel = require("../models/post.model");
const formatedDate = require("../utils/formatedDate");


//muestra de busqueda sin el valor de user "relacionado"
const getAllPostsWhithoutUser = async () => {
  const newData = await postModel.find();
  if (!newData.length) throw new Error(`No existe el post que se busco`)
  return newData;
};

//muestra de busqueda con el valor del user "relacionado"
const getAllPostsWhithUser = async () => {
  const newData = await postModel
    .find()
    .populate("user", "name email -_id")
    .select("name description createdAt updatedAt user")
    ;
  if (!newData.length) throw new Error(`No existe el post que se busco`)
  return newData;
};

const createPost = async (name, description, userId) => {
  const newPost = await postModel.create({
    name, description, createdAt: formatedDate(), updatedAt: formatedDate(), user: userId
  }
  );
  return newPost;
};

const deletePost = async (id) => {
  return await postModel.deleteOne({ _id: id }).then((result) => {
    if (result.deletedCount === 1) {
      return "Deleted successfully"
    }
    throw new Error(`Could not delete or not find post with id: ${id}`)
  }).catch(error => {
    throw new Error(error)
  })
}

const updatePost = async (id, data) => {
  let empty = false
  if (!Object.keys(data).length) throw new Error("Please indicate the fields to modify")
  Object.keys(data).forEach(async (key) => {
    if (data[key] === undefined || data[key].trim().length === 0) {
      empty = true
    }
  })
  if (empty) {
    throw new Error("Could not update post, complete all fields please!")
  } else {
    await postModel.findByIdAndUpdate(id, {
      ...data
    })
    return "Updated successfully"
  }
}

module.exports = {
  getAllPostsWhithoutUser,
  getAllPostsWhithUser,
  createPost,
  deletePost,
  updatePost
}
