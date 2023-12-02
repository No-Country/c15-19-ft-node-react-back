const { Router } = require("express");
const { getAllUsersHandler, postUserHandler } = require("../handlers/users.handler");
const userRouter = Router();

userRouter
  .get("/", getAllUsersHandler)
  .post("/", postUserHandler);


module.exports = userRouter;
