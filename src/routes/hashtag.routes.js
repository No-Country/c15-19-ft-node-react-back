const { Router } = require("express");
const {
  allHashtagsHandler,
  getHashtagByNameHandler,
  createHashTagHandler,
  deleteHashtagHandler,
} = require("../handlers/hashtag.handler");
const hashtagRouter = Router();

hashtagRouter
  .get("/", allHashtagsHandler)
  .get("/:id", getHashtagByNameHandler)
  .post("/", createHashTagHandler)
  .delete("/:id", deleteHashtagHandler);

module.exports = hashtagRouter;
