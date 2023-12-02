const { Router } = require("express");
const userRouter = require("./user.routes");
const postRouter = require("./post.routes");
const cloduinaryRouter = require("./cloudinary.routes");


const mainRouter = Router();

mainRouter
  .use("/users", userRouter)
  .use("/posts", postRouter)
  .use("/cloudinary", cloduinaryRouter)

module.exports = mainRouter;
