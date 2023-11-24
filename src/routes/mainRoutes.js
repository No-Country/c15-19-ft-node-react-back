const { Router } = require("express");

const mainRouter = Router();

mainRouter.get("/", (req, res) => {
  res.status(200).send("ok");
});

module.exports = mainRouter;
