require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = () => {
    const random = Math.random().toString(32).substring(2)
    const dateNow = Date.now().toString(32)
    return random + dateNow
};


const generateJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET , {
        expiresIn: '30d',

    } )
}

module.exports = {
    generateToken,
    generateJWT
};


