"use strict"

const uuid = require('node-uuid')
const bodyValidate = require('../utils/validateBody')
const userModel = require('../models/userModel')
const resources = require('../utils/resources')
    
const signIn = async (req, res, next) =>{
    let body = {     
        ...req.body,
        id: uuid.v4(),
        data_atualizacao: new Date(),
        data_criacao: new Date(),
        ultimo_login: new Date(),
        token: await resources.newToken(req.body.email)   
    }    

    let isValid = bodyValidate.validate(body)
    if(isValid.error){
        next()
        return res.status(400).json({mensagem: isValid.error.message})}

    const senha = body.senha
    const token = body.token   

    body.senha = await resources.encrypt(senha)
    body.token = await resources.encrypt(token)

    try{
        const userRegistry = await userModel.findOne(
            {email: body.email}
        ).lean()

        if(userRegistry){
            next()
            return res.status(409).json({mensagem: `E-mail já existente` })
        }

        await userModel.create(body)
        return res.status(201).json({...body, token: token, senha: senha})
    }
    catch(err){
        next(err)        
    }    
    
}

    const signOn = async (req, res) =>{
    const {email, senha} = req.body

    try{

        const userRegistry = await userModel.findOne(            
            {email: email}  
        ).lean()
                

        if(!userRegistry)
            return res.status(404).json({mensagem: "Usuário e/ou senha inválidos"})
        
        let senhaValid = await resources.compare(senha, userRegistry.senha)
        console.log(senhaValid)

        if(!senhaValid)
            return res.status(401).json({mensagem: "Usuário e/ou senha inválidos"})
        
        const token = await resources.newToken(email)
        const tokenHash = await resources.encrypt(token)
        const data = new Date()

        await userModel.findOneAndUpdate({id: userRegistry.id}, {data_atualizacao: data, ultimo_login: data, token: tokenHash}, {options: {useFindAndModify:true}})
    }
    catch(err){
        return next(err)
    }
    
    return res.status(204).json({userRegistry, data_atualizacao: data, ultimo_login: data, token: token})
    
}

const findUser = async (req, res) => {
    const id = req.params.id
    const token = req.headers.authentication

    try{
        let user = await userModel.findOne({id: id})
        if(!user)
            res.status(404).json({mensagem: "ID não encontrado"})

        let tokenIsValid = await resources.compare(token, user.token)
        if(tokenIsValid)
            return res.status(403).json({mensagem: "Não autorizado"})
        else
        {
            var dataAtual = new Date()
            let diff = user.ultimo_login - dataAtual
            let diffMins = Math.round(((diff % 86400000) % 3600000) / 60000)

            if(diffMins > 30)
               return res.status(401).json({mensagem: "Sessão inválida"})
            
            return res.status(200).json(user)
        }


    }catch(error){}
}


module.exports = {signIn, signOn, findUser}

