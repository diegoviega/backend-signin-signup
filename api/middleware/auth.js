const jwt = require('jsonwebtoken')

require('dotenv').config()

const validateToken =  (req, res, next) => {

    const authHeader = req.headers.authentication

    if(authHeader){
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err){
                next()
                return res.status(403).json({mensagem: "Não autorizado."})
            }
        })        
    }

    next()
    return res.status(100).send()
}


module.exports = validateToken