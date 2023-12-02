const { Router } = require("express");
const userRouter = require("./user.routes");
const postRouter = require("./post.routes");


const mainRouter = Router();

mainRouter
  .use("/users", userRouter)
  .use("/posts", postRouter)

module.exports = mainRouter;
