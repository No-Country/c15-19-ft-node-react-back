const mongoose = require("mongoose");
const { db } = require("./config");

const connect = async () => {
  try {
    await mongoose.connect(db.uri);
    console.log(">>> DB connection established <<<");

  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connect;
