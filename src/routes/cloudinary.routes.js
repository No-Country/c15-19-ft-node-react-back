const { Router } = require("express");
const { uploadMultiImageHandler, uploadOneImageHandler } = require("../handlers/cloudinary.handler");
const cloudinaryRouter = Router();

cloudinaryRouter
  .post("/", uploadMultiImageHandler)
  .post("/oneImage", uploadOneImageHandler)


module.exports = cloudinaryRouter;
