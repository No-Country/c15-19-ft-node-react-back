const { v2: cloudinary } = require('cloudinary');

const uploadMedia = async (filePath) => {
  console.log(filePath)
  return await cloudinary.uploader.upload(filePath, { folder: "test-image" })
}

module.exports = uploadMedia