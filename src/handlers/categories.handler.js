const {
  categoryCreate,
  allCategories,
  deleteCategoryAndChallenges,
  updateCategory,
} = require("../repositories/category.repository");

const allCategoryHandler = async (req, res) => {
  try {
    const { name, challenge } = req.query;
    const result = await allCategories(name, challenge);

    const messageName =
      name && !result.length ? `No categories found with this ${name}` : null;

    const messageChallenge =
      challenge && !result.length
        ? "Sorry there are no categories to search for challenges"
        : null;

    const messageCategory = !result.length
      ? "Sorry there are no categories"
      : null;

    const status =
      messageName || messageChallenge || messageCategory ? 404 : 200;

    const message = messageName || messageChallenge || messageCategory;

    res.status(status).json(message ? { message } : result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createCategoryHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await categoryCreate(name);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateCategoryHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.name) {
      const result = await updateCategory(id, req.body);
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteCategoryHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteCategoryAndChallenges(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  allCategoryHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
};
