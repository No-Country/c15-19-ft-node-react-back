const challengeModel = require("../models/challenge.model");
const categoryModel = require("../models/category.model");

const categoryCreate = async (name) => {
  const newCategory = await categoryModel.create({
    name,
  });
  return newCategory;
};

const allCategories = async (name, challenge) => {
  let categories = categoryModel.find().select("name disabled");

  if (name && !challenge) {
    categories.where({ name });
  } else if (!name && challenge) {
    categories.populate("challenges");
  } else if (name && challenge) {
    categories.where({ name }).populate("challenges");
  }

  const categoriesFilter = await categories.exec();
  return categoriesFilter;
};

const deleteCategoryAndChallenges = async (categoryId) => {
  try {
    // Busco todos los challenges asociados a la categoria
    const challengesToDelete = await challengeModel.find({
      categoryId,
    });

    // Elimino los challenges de esa categoria
    await challengeModel.deleteMany({ categoryId });

    // Elimino la categoria despues de haber eliminado los challenges
    const deletedCategory = await categoryModel.findByIdAndDelete(categoryId);

    return { deletedCategory, challengesDeleted: challengesToDelete };
  } catch (error) {
    console.error("Error deleting category and challenges:", error);
    throw new Error("Error deleting category and challenges");
  }
};

const updateCategory = async (id, data) => {
  const updatedCategory = await categoryModel.findByIdAndUpdate(id, data);
  if (updatedCategory) {
    const foundCategory = await categoryModel.findById(id);
    return foundCategory;
  }
};

module.exports = {
  deleteCategoryAndChallenges,
  categoryCreate,
  allCategories,
  updateCategory,
};
