const userModel = require("../models/user.model");
const challengeModel = require("../models/challenge.model");
const notificationModel = require("../models/notification.model");

const mongoose = require("mongoose");

const getAllUsers = async (filter, skip, take) => {
  if (filter.name) {
    filter.name = { $regex: filter.name, $options: "i" };
  }
  const users = filter.name
    ? await userModel.find(filter).skip(skip).limit(take).select("-password")
    : await userModel.find().skip(skip).limit(take).select("-password");
  return users;
};

const getUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid ID");
  const user = await userModel
    .findById(id)
    .select("-password -verificationEmail -notifications")
    .populate({
      path: "challenges",
      select: "title description media.url media.typeFile",
    });

  // Limitar a 1 el número de retos que se devuelven(Refactorizar(Mala practica))
  user.challenges.forEach((challenge) => {
    if (challenge.media && challenge.media.length > 0) {
      challenge.media = [challenge.media[0]];
    }
  });

  return user;
};

const updateUserById = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid ID");

  const updatedUser = await userModel
    .findByIdAndUpdate(id, data, {
      new: true,
    })
    .select("-password");
  return updatedUser;
};

const deleteUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid ID");

  const user = await userModel.findById(id);
  if (!user) {
    return null;
  }

  // Eliminar seguidores y seguidos
  await userModel.updateMany(
    { $or: [{ "followers.user": id }, { "following.user": id }] },
    { $pull: { followers: { user: id }, following: { user: id } } }
  );
  // Eliminar notificaciones
  await notificationModel.deleteMany({ _id: { $in: user.notifications } });
  // Eliminar retos
  await challengeModel.deleteMany({ _id: { $in: user.challenges } });
  // Eliminar el usuario
  await userModel.findByIdAndDelete(id);

  return { message: "User and related data deleted successfully" };
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
