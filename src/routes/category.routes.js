const { Router } = require("express");
const {
  allCategoryWhithOutChallengesHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  allCategoryWhithChallengesHandler,
} = require("../handlers/categories.handler");
const categoryRouter = Router();

categoryRouter
  .get("/", allCategoryWhithOutChallengesHandler)
  .get("/withChallenges", allCategoryWhithChallengesHandler)
  .post("/", createCategoryHandler)
  .patch("/:id", updateCategoryHandler)
  .delete("/:id", deleteCategoryHandler);

module.exports = categoryRouter;
