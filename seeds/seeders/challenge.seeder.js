// user.seeder.js
const ChallengeModel = require("../../src/models/challenge.model");
const UserModel = require("../../src/models/user.model");
const CategoryModel = require("../../src/models/category.model");
async function seedChallengesData() {
  try {
    //Get all users and categories active in the database
    const users = await UserModel.find();
    const categories = await CategoryModel.find();

    //Delete all challenges active in the database
    await ChallengeModel.deleteMany();

    //Create array challenges data
    const ChallengesData = [
      {
        user: users[0]._id,
        title: "Salta la cuerda!",
        description: "Reto de saltar la cuerda durante 30 segundos",
        likes: 0,
        media: [
          {
            url: "https://ejemplo.com/imagensaltacuerda.jpg",
            typeFile: "image",
          },
          {
            url: "https://ejemplo.com/videosaltacuerda.jpg",
            typeFile: "video",
          },
        ],
        categoryId: categories[0]._id,
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user: users[2]._id,
        title: "Prepara la cena mas rica!",
        description: "Reto de preparar la cena mas rica y comparte la receta",
        likes: 0,
        media: [
          {
            url: "https://ejemplo.com/cena.jpg",
            typeFile: "image",
          },
          {
            url: "https://ejemplo.com/cena.jpg",
            typeFile: "video",
          },
        ],
        categoryId: categories[1]._id,
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user: users[2]._id,
        title: "Grabate bailando tu cancion favorita!",
        description:
          "Reto de grabarte bailando tu cancion favorita y compartela",
        likes: 0,
        media: [
          {
            url: "https://ejemplo.com/grabate.jpg",
            typeFile: "image",
          },
          {
            url: "https://ejemplo.com/grabatepost.jpg",
            typeFile: "video",
          },
        ],
        categoryId: categories[1]._id,
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user: users[3]._id,
        title: "Foto de tu mascota!",
        description:
          "Reto de tomar una foto de tu mascota y compartela con nosotros",
        likes: 0,
        media: [
          {
            url: "https://ejemplo.com/mascota.jpg",
            typeFile: "image",
          },
        ],
        categoryId: categories[2]._id,
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    //Insert challenges data to db
    const challenges = await ChallengeModel.insertMany(ChallengesData);

    //Establish the relationship between the user and the challenge
    categories[0].challenges.push(challenges[0]._id);
    await categories[0].save();
    categories[1].challenges.push(challenges[1]._id);
    categories[1].challenges.push(challenges[2]._id);
    await categories[1].save();
    categories[2].challenges.push(challenges[3]._id);
    await categories[2].save();

    //Establish the relationship between the user and the challenge
    users[0].challenges.push(challenges[0]._id);
    await users[0].save();

    users[2].challenges.push(challenges[1]._id);
    users[2].challenges.push(challenges[2]._id);
    await users[2].save();

    users[3].challenges.push(challenges[3]._id);
    await users[3].save();

    console.log(
      `Challenges data seeded successfully. ${challenges.length} challenges created.`
    );
  } catch (error) {
    console.error("Error during challenge seeding:", error);
    throw error;
  }
}

module.exports = seedChallengesData;
