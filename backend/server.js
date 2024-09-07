require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
//const workoutRoutes = require('./routes/workouts')

//express app
const app = express()

//connect to mongobd
mongoose.connect(process.env.MONGODB)

app.get('/', (req, res) => {
    res.json({mssg: 'welcome to the app'})  //placeholder text
})

//routes
//app.use('/api.workouts', workoutRoutes)

//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})