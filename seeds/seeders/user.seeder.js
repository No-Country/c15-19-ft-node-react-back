// user.seeder.js
const UserModel = require("../../src/models/user.model");

async function seedUserData() {
  try {
    //Delete all users active in the database
    await UserModel.deleteMany();

    //Create array users data
    const userData = [
      {
        name: "John",
        email: "john@example.com",
        lastname: "Doe",
        password: "password1",
        username: "john_doe",
        picture: "https://randomuser.me/api/portraits/men/1.jpg",
        role: "admin",
        disabled: false,
        verificationEmail: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane",
        email: "jane@example.com",
        lastname: "Smith",
        password: "password2",
        username: "jane_smith",
        picture: "https://randomuser.me/api/portraits/women/2.jpg",
        role: "challenger",
        disabled: false,
        verificationEmail: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bob",
        email: "bob@example.com",
        lastname: "Johnson",
        password: "password3",
        username: "bob_johnson",
        picture: "https://randomuser.me/api/portraits/men/3.jpg",
        role: "challenger",
        disabled: false,
        verificationEmail: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Alice",
        email: "alice@example.com",
        lastname: "Williams",
        password: "password4",
        username: "alice_williams",
        picture: "https://randomuser.me/api/portraits/women/4.jpg",
        role: "challenger",
        disabled: false,
        verificationEmail: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Charlie",
        email: "charlie@example.com",
        lastname: "Brown",
        password: "password5",
        username: "charlie_brown",
        picture: "https://randomuser.me/api/portraits/men/5.jpg",
        role: "challenger",
        disabled: false,
        verificationEmail: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Insert users in the database
    const users = await UserModel.insertMany(userData);

    // Establish relationships between users
    users[0].following.push({ user: users[1]._id });
    users[0].following.push({ user: users[2]._id });

    users[1].followers.push({ user: users[0]._id });
    users[1].following.push({ user: users[3]._id });

    users[2].followers.push({ user: users[0]._id });
    users[2].following.push({ user: users[4]._id });

    users[3].followers.push({ user: users[1]._id });
    users[3].following.push({ user: users[0]._id });

    users[4].followers.push({ user: users[2]._id });
    users[4].following.push({ user: users[3]._id });

    //Save users in the database
    await Promise.all(users.map((user) => user.save()));
    console.log(
      `User data seeded successfully. ${users.length} users created.`
    );
  } catch (error) {
    console.error("Error during user seeding:", error);
    throw error;
  }
}

module.exports = seedUserData;
