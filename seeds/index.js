const mongoose = require("mongoose");
const connDb = require("../src/db");
const userSeeder = require("./seeders/user.seeder");
const categorySeeder = require("./seeders/category.seeder");
const challengeSeeder = require("./seeders/challenge.seeder");
const commentSeeder = require("./seeders/comment.seeder");
const notificationSeeder = require("./seeders/notification.seeder");

async function seedAllData() {
  try {
    //Connect to db and seed data to db
    await connDb();
    console.log("Start seeding data...");
    await categorySeeder();
    await userSeeder();
    await challengeSeeder();
    await commentSeeder();
    await notificationSeeder();
    console.log("Seeding data successfully");
  } catch (error) {
    //Catch error and close db connection
    console.error("Error seeding data: " + error);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log("<<< DB connection closed >>>");
    }
  }
}

seedAllData();
