const joi = require('joi')

const schema = joi.object({ 
    id: joi.string().guid({
        version: "uuidv4"
    }),
    nome: joi.string()
    .alphanum()
    .min(3)
    .max(30),
    email: joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    senha: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    telefones: joi.array().items(
        joi.object({
        numero: joi.number().integer(),
        ddd: joi.number().integer()  
    })   
    ),
    data_atualizacao: joi.date().required(),
    data_criacao: joi.date().required(),
    ultimo_login: joi.date().required(),
    token: joi.string().required()
})


const validate = (user) =>{
        return schema.validate(user)    
}


module.exports = {validate}