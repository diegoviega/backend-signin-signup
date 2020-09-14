"use strict"

const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.String,        
    },
    nome: {
        type: mongoose.Schema.Types.String,
        required: [true, "Nome é obrigatório"]
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: [true, "Email é obrigatório"]
    },
    senha: {
        type: mongoose.Schema.Types.String,
        required: [true, "Senha é obrigatório"]
    },
    telefones: [{
        numero: {
            type: mongoose.Schema.Types.Number,
            required: [true, "Número é obrigatório"]},
        ddd: {
            type: mongoose.Schema.Types.Number,
            required: [true, "DDD é obrigatório"]},
    }],
    ultimo_login: {
        type: mongoose.Schema.Types.Date,        
    },
    data_criacao: {
        type: mongoose.Schema.Types.Date,        
    },
    data_atualizacao: {
        type: mongoose.Schema.Types.Date,        
    },
    token: {
        type: mongoose.Schema.Types.String,
        required: [true, "Token é obrigatório"]
    }
},
{    
    collection: "users",
    strict: true
})

module.exports = mongoose.model('Users', userSchema)