const challengeModel = require("../models/challenge.model");
const categoryModel = require("../models/category.model");

const allChallenge = async () => {
  const allChallenges = await challengeModel.find();
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
  console.log(hashtagIds);
  const newChallenge = await challengeModel.create({
    user,
    title,
    description,
    categoryId,
    media,
  });

  const category = await categoryModel.findById(categoryId);
  category.challenges.push(newChallenge._id);
  await category.save();
  return newChallenge;
};

const updateChallenge = async (id, data) => {
  const updatedChallenge = await challengeModel.findByIdAndUpdate(id, data);
  if (data.categoryId) {
    const categoryId = updatedChallenge.categoryId;
    const category = await categoryModel.findById(categoryId);
    if (category) {
      //elimino el challenges de la lista challenges que se encuentra en category
      category.challenges.pull(updatedChallenge._id);
      await category.save(); // Guardo los cambios
      const categoryNew = await categoryModel.findById(data.categoryId);
      //agrego el challenges a la nueva categoria pasada
      categoryNew.challenges.push(updatedChallenge._id);
      await categoryNew.save();
    }
  }
  //Esto lo hago para mostrar el challenge actualiado al cliente
  if (updatedChallenge) {
    const foundChallenge = await challengeModel.findById(id);
    return foundChallenge;
  }
};

const deleteChallenge = async (challengeId) => {
  const challenge = await challengeModel.findById(challengeId);
  if (challenge) {
    const category = await categoryModel.findById(challenge.categoryId);
    if (category) {
      category.challenges.pull(challengeId);
      await category.save();
    }
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
