const mongoose = require("mongoose");

const DB_URI = "mongodb://localhost:27017/app";

module.exports = () => {
  const connect = () => {
    mongoose
      .connect(DB_URI)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
      });
  };

  connect();

  // Eventos de conexión y error
  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from MongoDB");
  });
};
