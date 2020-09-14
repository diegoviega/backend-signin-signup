const express = require('express')
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute')
const userController = require('./controllers/userController')
const authentication = require('./middleware/auth')


const app = express()

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json({
    type: '*/*'
}))

app.use(authentication)

app.use((req, res, next) =>{
    res.setHeader("Content-Type", "application/json");
    next();
});

require('./database')

//app.use('/api', userRoute)
app.post('/signIn', bodyParser.json(),  userController.signIn)
app.patch('/signOn', bodyParser.json(), userController.signOn)
app.get('/findUser/:id', userController.findUser)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
})
