const { Router } = require("express");
const { getAllUsersHandler, postUserHandler } = require("../handlers/users.handler");
const {registerUserHandler} = require('../handlers/register.handler')

const userRouter = Router();

userRouter
  .get("/", getAllUsersHandler)
  .post("/", postUserHandler)
  .post('/register', registerUserHandler)


module.exports = userRouter;
