const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const newToken =  async (nome) => {
    let token
    try{
        token = await jwt.sign({data: nome}, process.env.SECRET_KEY, {
            expiresIn: "1800"
        })
    }catch(error){
        return error
    }
    return token
}

const encrypt = async (pass) => {
    let senhaHash
    try{
        senhaHash = await bcrypt.hash(pass, 10)
    }catch(error){
        return error
    }

    return senhaHash
}

const compare = async (data, senhaHash) => {
    let isValid 
    try{
        isValid = await bcrypt.compare(data, senhaHash)
    }catch(error){
        return error
    }
    return isValid
}


module.exports = {newToken, encrypt, compare}