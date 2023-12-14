const {
  allChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} = require("../repositories/challenge.repository");
const Hashtag = require("../models/hashtag.model");

const mongoose = require("mongoose");

const cloudinaryUtil = require("../utils/uploadMedia");

const allChallengeHandler = async (req, res) => {
  try {
    const response = await allChallenge();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createChallengeHandler = async (req, res) => {
  try {
    const { user, title, description, categoryId, typeFile, hashtags } =
      req.body;

    const hashtagIds = await handleHashtags(hashtags);

    if (req.files?.media) {
      try {
        media = await cloudinaryUtil.formatedData(req.files.media);
        if (media.length) {
          const response = await createChallenge(
            user,
            title,
            description,
            categoryId,
            hashtagIds,
            media
          );
          return res.status(200).json(response);
        }
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    }
    const response = await createChallenge(
      user,
      title,
      description,
      categoryId,
      hashtags
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleHashtags = async (hashtags) => {
  const hashtagIds = [];

  for (const hashtag of hashtags) {
    // Intenta encontrar el hashtag existente
    console.log(hashtag);

    // Si no se encuentra, crea un nuevo hashtag
  }

  return hashtagIds;
};

const updateChallengeHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, categoryId } = req.body;
    if (title || description || categoryId) {
      const response = await updateChallenge(id, req.body);
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteChallengeHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteChallenge(id);
    if (response.error) {
      return res.status(response.status).json({ error: response.error });
    }
    res.status(200).json({ challege: response, message: "success deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  allChallengeHandler,
  createChallengeHandler,
  updateChallengeHandler,
  deleteChallengeHandler,
};
