const { Router } = require("express");
const {
  allChallengeHandler,
  createChallengeHandler,
  updateChallengeHandler,
  deleteChallengeHandler,
} = require("../handlers/challenges.handler");
const challengeRouter = Router();

challengeRouter
  .get("/", allChallengeHandler)
  .post("/", createChallengeHandler)
  .patch("/:id", updateChallengeHandler)
  .delete("/:id", deleteChallengeHandler);

module.exports = challengeRouter;
