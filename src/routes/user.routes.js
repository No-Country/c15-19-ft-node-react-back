const { Router } = require("express");
const {
  getAllUsersHandler,
  getUserByIdHandler,
  deleteUserByIdHandler,
  updateUserByIdHandler,
} = require("../handlers/users.handler");
const userRouter = Router();

userRouter
  .get("/", getAllUsersHandler)
  .get("/:id", getUserByIdHandler)
  .patch("/:id", updateUserByIdHandler)
  .delete("/:id", deleteUserByIdHandler);


module.exports = userRouter;
