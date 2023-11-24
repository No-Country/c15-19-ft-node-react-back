const mongoose = require('mongoose')

const mongoAtlasUri =
  "mongodb+srv://nicodev:nikokpo12@atlascluster.n2k82wh.mongodb.net/?retryWrites=true&w=majority";

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongoAtlasUri
  );
} catch (e) {
  console.log("could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));