// user.seeder.js
const CommentModel = require("../../src/models/comment.model");
const UserModel = require("../../src/models/user.model");
const ChallengeModel = require("../../src/models/challenge.model");

async function seedCommentData() {
  try {
    //Get all users and challenges active in the database
    const users = await UserModel.find();
    const challenges = await ChallengeModel.find();

    //Delete all comments active in the database
    await CommentModel.deleteMany();

    //Create array comments data
    const commentData = [
      {
        content: "Que interesante reto. Este es el reto #1",
        user: users[0]._id,
        challenge: challenges[0]._id,
        media: {
          url: "https://ejemplo.com/imagen1.jpg",
          typeFile: "image",
        },
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "Aqui estoy saltando la cuerda. Este es el reto #1",
        user: users[4]._id,
        challenge: challenges[0]._id,
        media: {
          url: "https://ejemplo.com/test.jpg",
          typeFile: "image",
        },
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "Que interesante reto. Este es el reto #2",
        user: users[2]._id,
        challenge: challenges[1]._id,
        media: {
          url: "https://ejemplo.com/imagen1.jpg",
          typeFile: "image",
        },
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    //Insert comments data to db
    const comments = await CommentModel.insertMany(commentData);

    //Establish the relationship between the user and the comment
    challenges[0].comments.push(comments[0]._id);
    challenges[0].comments.push(comments[1]._id);
    await challenges[0].save();

    challenges[1].comments.push(comments[2]._id);
    await challenges[1].save();

    console.log(
      `Comment data seeded successfully. ${comments.length} comments created.`
    );
  } catch (error) {
    console.error("Error during comment seeding:", error);
    throw error;
  }
}

module.exports = seedCommentData;
