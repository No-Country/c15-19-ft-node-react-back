const { Router } = require("express");
const { getAllUsersHandler, postUserHandler } = require("../handlers/users.handler");
const {registerUserHandler} = require('../handlers/register.handler')
const {authenticateUserHandler} = require('../handlers/login.handler')
const {verifyAccountHandler} = require('../handlers/verifyAccount.handler')


const userRouter = Router();

userRouter
  .get("/", getAllUsersHandler)
  .post("/", postUserHandler)
  .post('/register', registerUserHandler)
  .post('/login', authenticateUserHandler)
  .get('/verify-account/:token', verifyAccountHandler)


module.exports = userRouter;
