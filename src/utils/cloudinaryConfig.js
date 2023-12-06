const { v2: cloudinary } = require('cloudinary');
require("dotenv").config();

module.exports = cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true
});