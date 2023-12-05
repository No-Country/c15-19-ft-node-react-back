const jwt = require('jsonwebtoken');

const UserSchema = require("../models/user.model.js")

const checkAuth = async(req, res, next) => {

    // Se inicializa una variable token para almacenar el token de autorización presente en el encabezado Authorization de la solicitud
    let token

    // Si el encabezado Authorization comienza con "Bearer"...
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                // ...se extrae el token de autorización y se almacena en la variable token.
                token = req.headers.authorization.split(' ')[1]

                const decoded = jwt.verify(token, process.env.JWT_SECRET)

                req.user = await UserSchema.findById(decoded.id).select('-password -verificationEmail -challenges -token -createdAt -updatedAt -role -picture -lastname -username -followers -following -notifications -disabled -__v')

                // console.log(req.user)

                return next()

            } catch (error) {
                return res.status(404).json({msg: 'Hubo un error'})
            }
    }
    
    if(!token) {
        const error = new Error('Token no válido')
        return res.status(401).json({ msg: error.message })
    }

    next()

}

module.exports = {
    checkAuth
} 