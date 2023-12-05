const { Router } = require("express");
const { getAllUsersHandler, postUserHandler } = require("../handlers/users.handler");
const {registerUserHandler} = require('../handlers/register.handler')
const {authenticateUserHandler} = require('../handlers/login.handler')
const {verifyAccountHandler} = require('../handlers/verifyAccount.handler')

const {checkAuth} = require('../middleware/checkAuth')

const {profile} = require('../handlers/profile.handler')


const userRouter = Router();

userRouter
  .get("/", getAllUsersHandler)
  .post("/", postUserHandler)
  .post('/register', registerUserHandler)
  .post('/login', authenticateUserHandler)
  .get('/verify-account/:token', verifyAccountHandler)

  .get('/profile', checkAuth, profile)


module.exports = userRouter;
