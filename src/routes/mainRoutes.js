const { Router } = require("express");
const userRouter = require("./user.routes");
const postRouter = require("./post.routes");
const cloduinaryRouter = require("./cloudinary.routes");
const categoriesRouter = require("./category.routes");
const challengesRouter = require("./challenge.routes");

const mainRouter = Router();

mainRouter
  .use("/users", userRouter)
  .use("/posts", postRouter)
  .use("/cloudinary", cloduinaryRouter)
  .use("/categories", categoriesRouter)
  .use("/challenges", challengesRouter);

module.exports = mainRouter;
