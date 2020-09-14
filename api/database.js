"use strict"

const mongoose = require('mongoose');
require('dotenv').config()

console.log(process.env.DB_CONNECTION)

const mongoDB = `${process.env.DB_CONNECTION}`;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));