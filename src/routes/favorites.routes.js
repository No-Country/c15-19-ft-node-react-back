const { Router } = require("express");
const { addToFavoritesHandler, removeFromFavoritesHandler, getAllFavoritesHandler } = require("../handlers/favorites.handler");
const { checkAuth } = require("../middleware/checkAuth");

const favoritesRouter = Router();

favoritesRouter.post("/add/:userId/:challengeId", addToFavoritesHandler);
favoritesRouter.post("/remove/:userId/:challengeId", removeFromFavoritesHandler);
favoritesRouter.get('/all/:userId', getAllFavoritesHandler);

module.exports = favoritesRouter;
