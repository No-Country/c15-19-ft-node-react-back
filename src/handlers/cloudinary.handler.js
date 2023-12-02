const uploadMedia = require("../utils/uploadMedia");
const pLimit = require("p-limit")

const uploadMultiImageHandler = async (req, res) => {
  try {
    const limit = pLimit(2)
    // console.log(req.files.image)
    if (req.files?.image) {
      const imagesToUpload = req.files.image.map((image) => {
        image.mv(`./uploads/${image.name}`)
        return limit(async () => {
          const result = await uploadMedia(`./uploads/${image.name}`)
          console.log(`> Result: ${result.secure_url}`);
          return result
        })
      })
      await Promise.all(imagesToUpload).then(() => {
        return res.status(200).send("Successfully uploaded")
      })
      return
    }
    res.status(400).send("Please enter valid image/s")
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadOneImageHandler = async (req, res) => {
  try {
    if (req.files?.image) {
      const image = req.files?.image
      image.mv(`./uploads/${image.name}`)
      const result = await uploadMedia(`./uploads/${image.name}`);
      console.log(`> Result: ${result.secure_url}`);
      if (result) {
        return res.status(200).send("Successfully uploaded")
      }
    }
    res.status(400).send("Please enter valid image/s")
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { uploadMultiImageHandler, uploadOneImageHandler }