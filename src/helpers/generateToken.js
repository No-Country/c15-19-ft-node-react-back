require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = () => {
    const uniqueId = Math.random().toString(36).substring(2, 17);

    const tokenOptions = {
        expiresIn: '15d',//Expira em 15 dias
    };

    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ id: uniqueId }, secretKey, tokenOptions);

    // Imprimir la fecha de expiración
    const decodedToken = jwt.verify(token, secretKey);

    //Para chequear el funcionamiento de la expiración
    console.log('Fecha de expiración:', new Date(decodedToken.exp * 1000));

    return token;
};

module.exports = {
    generateToken,
};


