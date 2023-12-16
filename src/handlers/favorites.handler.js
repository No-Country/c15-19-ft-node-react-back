const { addToFavorites, removeFromFavorites, getAllFavorites } = require("../repositories/favorites.repository");

const addToFavoritesHandler = async (req, res) => {
  try {
    const { userId, challengeId } = req.params;
    
    await addToFavorites(userId, challengeId);
    res.status(200).json({ message: "Challenge added to favorites" });
  } catch (error) {
    // Verifica si el error es que el desafío ya está en favoritos
    if (error.message === "Challenge already in favorites") {
      res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const removeFromFavoritesHandler = async (req, res) => {
  try {
    const { userId, challengeId } = req.params;
    
    await removeFromFavorites(userId, challengeId);
    res.status(200).json({ message: "Challenge removed from favorites" });
  } catch (error) {
    // Verifica si el error es debido a que el desafío no está en favoritos
    if (error.message === "Challenge not in favorites") {
      res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const getAllFavoritesHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const favorites = await getAllFavorites(userId);
    res.status(200).json({ favorites });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addToFavoritesHandler, removeFromFavoritesHandler, getAllFavoritesHandler };

