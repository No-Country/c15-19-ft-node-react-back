const challengeModel = require("../models/challenge.model");
const categoryModel = require("../models/category.model");
const userModel = require("../models/user.model");
const hashtagModel = require("../models/hashtag.model");
// const commentModel = require("../models/comment.model");

const allChallenge = async () => {
  const allChallenges = await challengeModel
    .find()
    .populate("hashtags", "name -_id");
  return allChallenges;
};

const createChallenge = async (
  user,
  title,
  description,
  categoryId,
  hashtagIds,
  media
) => {
  const newChallenge = await challengeModel.create({
    user,
    title,
    description,
    categoryId,
    hashtags: hashtagIds,
    media,
  });

  const category = await categoryModel.findById(categoryId);
  category.challenges.push(newChallenge._id);
  await category.save();

  const userFound = await userModel.findById(user);
  userFound.challenges.push(newChallenge._id);
  await userFound.save();
  return newChallenge;
};

const updateChallenge = async (id, data) => {
  const foundChallenge = await challengeModel.findById(id);
  console.log(foundChallenge);
  const updatedChallenge = await challengeModel.findOneAndUpdate(
    { _id: id },
    data,
    {
      new: true,
      rawResult: true,
    }
  );
  console.log(updatedChallenge);
  if (updatedChallenge.lastErrorObject.updatedExisting) {
    if (data.categoryId) {
      const category = await categoryModel.findById(foundChallenge.categoryId);
      category.challenges.pull(foundChallenge._id);
      await category.save(); // Guardo los cambios
      const categoryNew = await categoryModel.findById(data.categoryId);
      categoryNew.challenges.push(foundChallenge._id);
      await categoryNew.save();
    }
    return "Challenge updated succesfully";
  }
  return [];
};

const deleteChallenge = async (challengeId) => {
  const challenge = await challengeModel.findById(challengeId);
  if (challenge) {
    const category = await categoryModel.findById(challenge.categoryId);
    const hashtags = await hashtagModel.findById(challenge.hashtags);
    // const comments = await commentModel.findById(challenge.comments);
    if (category) {
      category.challenges.pull(challengeId);
      await category.save();
    }
    if (hashtags) {
      hashtags.challenges.pull(challengeId);
      await hashtags.save();
    }
    // if (category) {
    //   category.challenges.pull(challengeId);
    //   await category.save();
    // }
    await challengeModel.deleteOne({ _id: challengeId });
    return challenge;
  }
  return { status: 400, error: "Challenge not found" };
};

module.exports = {
  allChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
};
