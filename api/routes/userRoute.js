"use strict"
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.route('/signIn').post((req, resp, next) => userController.signIn)
router.put('/signOn',  (req, resp, next) =>  userController.signOn)
router.get('/search',  (req, resp, next) =>  userController.userFind)

module.exports = router