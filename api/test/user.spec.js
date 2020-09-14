const mongoose = require('mongoose')
const User = require('../models/userModel')

const chai = require('chai')
const chaiHttp = require('chai-http')
const { signIn } = require('../controllers/userController')
const should = chai.should()

chai.use(chaiHttp)

describe('Teste das funcoes', () =>{
    it('signIn')
})
