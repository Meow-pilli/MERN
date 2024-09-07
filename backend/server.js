require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const BudgetModel = require('./models/Total_Budget')
const cors = require('cors')
//const workoutRoutes = require('./routes/workouts')

//express app
const app = express()
app.use(express.json())
app.use(cors())

//connect to mongobd
mongoose.connect(process.env.MONGODB_URI)


app.get('/', (req, res) => {
    res.json({mssg: 'welcome to the app'})  //placeholder text
})


app.get("/getBudgets", (req, res) => {
    BudgetModel.find()
    .then(total_budgets => res.json(Misc))
    .catch(err => res.json(err))
});


app.post("/postBudgets", async (req, res) => {
    const user = req.body
    const NewUser = new BudgetModel(user)
    await NewUser.save()

    res.json(user)
})

//routes
//app.use('/api.workouts', workoutRoutes)

//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})