const { Router } = require("express");
const { getAllPostsHandler, createPostHandler, getAllPostsWhithUserHandler, deleteOnePostHandler, updatePostHandler } = require("../handlers/posts.handler");
const postRouter = Router();

postRouter
  .get("/", getAllPostsHandler)
  .get("/whith", getAllPostsWhithUserHandler)
  .post("/", createPostHandler)
  .delete("/:id", deleteOnePostHandler)
  .put("/:id", updatePostHandler);


module.exports = postRouter;
