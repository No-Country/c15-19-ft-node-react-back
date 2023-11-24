const { Router } = require("express");
const { getData, createUser } = require("../controllers/users.controller.js");

const usersRouter = Router();
usersRouter.get("/", getData);
usersRouter.post("/", createUser);


module.exports = usersRouter;
