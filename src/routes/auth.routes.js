const { Router } = require("express");

const { registerUserHandler, verifyAccountHandler,authenticateUserHandler, profile } = require("../handlers/auth.handler");
const { checkAuth } = require("../middleware/checkAuth");

const authRouter = Router();



authRouter
  .post('/register', registerUserHandler)
  .post('/login', authenticateUserHandler)
  .get('/verify-account/:token', verifyAccountHandler)

  .get('/profile', checkAuth, profile)

module.exports = authRouter