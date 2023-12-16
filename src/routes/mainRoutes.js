const { Router } = require("express");
const userRouter = require("./user.routes");
const postRouter = require("./post.routes");
const authRouter = require("./auth.routes");
const cloduinaryRouter = require("./cloudinary.routes");
const categoriesRouter = require("./category.routes");
const challengesRouter = require("./challenge.routes");

const favoritesRouter = require("./favorites.routes");

const hashtagsRouter = require("./hashtag.routes");


const mainRouter = Router();

mainRouter
  .use("/users", userRouter)
  .use("/posts", postRouter)

  .use("/auth", authRouter)

  .use("/cloudinary", cloduinaryRouter)
  .use("/categories", categoriesRouter)
  .use("/challenges", challengesRouter)


  .use("/favorites", favoritesRouter)

  .use("/hashtags", hashtagsRouter);


module.exports = mainRouter;
