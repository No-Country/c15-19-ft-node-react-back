const hashtagModel = require("../models/hashtag.model");
const mongoose = require("mongoose");

const getAllHashtags = async () => {
  const hashtags = await hashtagModel.find();
  return hashtags;
};

const getHashtagByName = async (name) => {
  const hashtag = await hashtagModel.find({ name });
  return hashtag[0];
};

const createHashTag = async (name) => {
  const hashtag = await hashtagModel.create({ name });
  return hashtag;
};

const deleteHashtag = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid ID");
  const hashtag = await hashtagModel.findByIdAndDelete(id);
  return hashtag;
};

module.exports = {
  getAllHashtags,
  getHashtagByName,
  createHashTag,
  deleteHashtag,
};
