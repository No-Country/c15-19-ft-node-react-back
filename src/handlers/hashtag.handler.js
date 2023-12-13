const {
  getAllHashtags,
  getHashtagByName,
  createHashTag,
  deleteHashtag,
} = require("../repositories/hashtag.repository");

const allHashtagsHandler = async (req, res) => {
  try {
    const response = await getAllHashtags();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHashtagByNameHandler = async (req, res) => {
  try {
    const { name } = req.params;
    const response = await getHashtagByName(name);

    if (!response) {
      return res.status(404).json({ message: "Hashtag not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createHashTagHandler = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name.startsWith("#")) {
      return res
        .status(400)
        .json({ message: "The hashtag name must start with #" });
    }

    const response = await createHashTag(name);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteHashtagHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteHashtag(id);
    res.status(200).json({ hashtag: response, message: "Success deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  allHashtagsHandler,
  getHashtagByNameHandler,
  createHashTagHandler,
  deleteHashtagHandler,
};
