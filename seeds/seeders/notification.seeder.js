// user.seeder.js
const NotificationModel = require("../../src/models/notification.model");
const UsersModel = require("../../src/models/user.model");

async function seedNotificationsData() {
  try {
    //Delete all notifications active in the database
    await NotificationModel.deleteMany();

    //Create array notifications data
    const notificationData = [
      {
        content: "Notificacion para el usuario",
        read: false,
        createdAt: new Date(),
      },
      {
        content: "Notificacion para el usuario",
        read: false,
        createdAt: new Date(),
      },
      {
        content: "Notificacion para el usuario",
        read: false,
        createdAt: new Date(),
      },
      {
        content: "Notificacion para el usuario",
        read: false,
        createdAt: new Date(),
      },
      {
        content: "Notificacion para el usuario",
        read: false,
        createdAt: new Date(),
      },
    ];

    //Insert notifications data to db
    const notifications = await NotificationModel.insertMany(notificationData);

    //Establish the relationship between the user and the notification
    const users = await UsersModel.find();
    users[0].notifications.push(notifications[0]._id);
    users[0].notifications.push(notifications[1]._id);
    await users[0].save();

    users[1].notifications.push(notifications[2]._id);
    await users[1].save();

    users[2].notifications.push(notifications[3]._id);
    await users[2].save();

    users[3].notifications.push(notifications[4]._id);
    await users[3].save();

    console.log(
      `Notification data seeded successfully. ${notifications.length} notifications created.`
    );
  } catch (error) {
    console.error("Error during notifaction seeding:", error);
    throw error;
  }
}

module.exports = seedNotificationsData;
