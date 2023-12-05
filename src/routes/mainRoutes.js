const { Router } = require("express");
const userRouter = require("./user.routes");
const postRouter = require("./post.routes");
const authRouter = require("./auth.routes")


const mainRouter = Router();

mainRouter
  .use("/users", userRouter)
  .use("/posts", postRouter)
  .use("/auth", authRouter)

module.exports = mainRouter;
