const  User = require('../models/user.model');
const Challenge = require("../models/challenge.model")


const addToFavorites = async (userId, challengeId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.favoriteChallenges.includes(challengeId)) {
      user.favoriteChallenges.push(challengeId);
      await user.save();
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeFromFavorites = async (userId, challengeId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const index = user.favoriteChallenges.indexOf(challengeId);
    if (index !== -1) {
      user.favoriteChallenges.splice(index, 1);
      await user.save();
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { addToFavorites, removeFromFavorites };

// const addFavorites = async(req, res) => {
//     const {user, _id} = req.query

//     // Verificar si el challenge ya está en favoritos
//     const favoritesExisting = await User.findById(_id);
//         if (user.favoriteChallenges.includes(_id)) {
//           return res.status(400).json({ error: "Challenge already in favorites" });
//         }

//     // Agregar challenge a la lista de favoritos
//         user.favoriteChallenges.push(_id);
//         await user.save();

//         res.status(200).json({ message: "Challenge added to favorites" });
    
// }

// module.exports = {
//     addFavorites
// }