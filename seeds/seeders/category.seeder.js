// user.seeder.js
const CategoryModel = require("../../src/models/category.model");

async function seedCategoriesData() {
  try {
    //Delete all categories active in the database
    await CategoryModel.deleteMany();

    //Create array categories data
    const categoryData = [
      { name: "Fitness", disabled: false, challenges: [] },
      { name: "Music", disabled: false, challenges: [] },
    ];

    //Insert categories data to db
    const categories = await CategoryModel.insertMany(categoryData);

    console.log(
      `Category data seeded successfully. ${categories.length} categories created.`
    );
  } catch (error) {
    console.error("Error during category seeding:", error);
    throw error;
  }
}

module.exports = seedCategoriesData;
