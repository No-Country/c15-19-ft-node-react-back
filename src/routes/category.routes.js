const { Router } = require("express");
const {
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  allCategoryHandler,
} = require("../handlers/categories.handler");
const categoryRouter = Router();

categoryRouter
  .get("/", allCategoryHandler)
  .post("/", createCategoryHandler)
  .patch("/:id", updateCategoryHandler)
  .delete("/:id", deleteCategoryHandler);

module.exports = categoryRouter;
