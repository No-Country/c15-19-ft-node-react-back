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
    const { user, title, description, categoryId, hashtags } = req.body;
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
      hashtagIds
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleHashtags = async (hashtags) => {
  const hashtagIds = [];

  for (const hashtag of hashtags) {
    try {
      // Intenta encontrar el hashtag existente
      const existingHashtag = await Hashtag.findOne({ name: hashtag });
      // Si se encuentra, obtén su ID
      if (existingHashtag) {
        hashtagIds.push(existingHashtag._id);
      } else {
        // Si no se encuentra, crea un nuevo hashtag
        const newHashtag = await Hashtag.create({ name: hashtag });
        hashtagIds.push(newHashtag._id);
      }
    } catch (error) {
      console.error(`Error al manejar el hashtag ${hashtag}: ${error.message}`);
    }
  }
  return hashtagIds;
};

const updateChallengeHandler = async (req, res) => {
  try {
    // const response = await updateChallenge(id, req.body);
    const { id } = req.params;
    const response = await updateChallenge(id, req.body);
    if (!Object.keys(req.body).length) {
      return res.status(404).send({ error: "No data provided to change." });
    }
    if (req.body && response.length) {
      return res.status(200).json({ message: response });
    } else {
      return res.status(404).send({ error: "Challenge not found" });
    }
  } catch (error) {
    console.log(error);
    if (error.name === "CastError" && error.kind === "ObjectId") {
      // Este es un error de cast de ObjectId, puedes personalizar el mensaje aquí
      return res.status(404).json({
        error: `The ${error.path} provided is invalid or was not found.`,
      });
    }
    if (
      error instanceof TypeError &&
      error.message.includes("Cannot set properties of null")
    ) {
      return res.status(500).json({
        error:
          "An error occurred while processing the request: Cannot set properties of null.",
      });
    }
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
