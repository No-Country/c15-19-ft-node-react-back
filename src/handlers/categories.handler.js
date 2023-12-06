const {
  categoryCreate,
  allCategoriesWithoutChallenges,
  allCategoriesWithChallenges,
  deleteCategoryAndChallenges,
  updateCategory,
} = require("../repositories/category.repository");

const allCategoryWhithOutChallengesHandler = async (req, res) => {
  try {
    const result = await allCategoriesWithoutChallenges();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const allCategoryWhithChallengesHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const result = await allCategoriesWithChallenges(name);
    res.status(200).json(result);
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
  allCategoryWhithChallengesHandler,
  allCategoryWhithOutChallengesHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
};
