const  User = require('../models/user.model');
const Challenge = require('../models/challenge.model')

const addToFavorites = async (userId, challengeId) => {
  try {
    const user = await User.findById(userId);
    const challenge = await Challenge.findById(challengeId);

    if (!user) throw new Error("User not found");
    
    if (!challenge) throw new Error("Challenge not found");
    
    if (user.favoriteChallenges.includes(challenge._id)){
      throw new Error("Challenge already in favorites");
    } 
    
    user.favoriteChallenges.push(challenge._id);
    await user.save();

  } catch (error) {
    throw new Error(error.message);
  }
};


const removeFromFavorites = async (userId, challengeId) => {
  try {
    const user = await User.findById(userId);
    
    if (!user)  throw new Error("User not found");
    
    const index = user.favoriteChallenges.indexOf(challengeId);
    
    if (index === -1) throw new Error("Challenge not in favorites");
    
    user.favoriteChallenges.splice(index, 1);
    await user.save();

  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllFavorites = async (userId) => {
  try {
    const user = await User.findById(userId).populate('favoriteChallenges');
    
    if (!user) {
      throw new Error("User not found");
    }

    return user.favoriteChallenges;

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { addToFavorites, removeFromFavorites, getAllFavorites };


