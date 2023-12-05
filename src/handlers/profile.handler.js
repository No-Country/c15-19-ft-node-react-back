// const User = require('../models/user.model');

const profile = (req,res) => {
    const { user } = req

    res.json(user)
}

module.exports = {
    profile
}