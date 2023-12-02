const uploadMedia = require("../utils/uploadMedia");

const uploadMediaHandler = async (req, res) => {
  try {
    // console.log(req.body)
    // console.log(req.files?.image)
    // console.log(req.files?.video)
    if (req.files?.image) {
      req.files.image.mv(`./uploads/${req.files.image.name}`)
      const result = await uploadMedia(`./uploads/${req.files.image.name}`)
      console.log(result)
    }
    // if (req) {
    //   // console.log(req.files.image)
    // }
    console.log("no hay nada")
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadMediaHandler }