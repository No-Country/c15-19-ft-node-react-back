const mongoose = require("mongoose");

const DB_URI = "mongodb://localhost:27017/crud";

const connect = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/crud`);
    console.log(">>> DB connection established <<<")
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connect
