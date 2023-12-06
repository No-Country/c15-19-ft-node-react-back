const { v2: cloudinary } = require("cloudinary");
const pLimit = require("p-limit");

const cloudinaryUtil = {
  uploadImage: async (filePath) => {
    return await cloudinary.uploader.upload(filePath, { folder: "test-image" });
  },
  formatedData: async (files) => {
    const imagesToUpload = files.map(async (image) => {
      image.mv(`./uploads/${image.name}`);
      const result = await cloudinaryUtil.uploadImage(
        `./uploads/${image.name}`
      );
      return result;
    });
    const result = await Promise.all(imagesToUpload);
    const data = result.map((result) => {
      return {
        url: result.secure_url,
        public_id: result.public_id,
        typeFile: result.resource_type,
      };
    });
    return data;
  },
};

module.exports = cloudinaryUtil;
