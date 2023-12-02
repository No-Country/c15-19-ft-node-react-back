const { Router } = require("express");
const { uploadMediaHandler } = require("../handlers/cloudinary.handler");
const cloudinaryRouter = Router();

cloudinaryRouter
  .post("/", uploadMediaHandler);


module.exports = cloudinaryRouter;
