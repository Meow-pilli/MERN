require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const BudgetModel = require('./models/Total_Budget')
const FestivalModel = require('./models/Festival_List')
const UserModel = require("./models/Users")
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
    BudgetModel.find({}).then(function(Total_Budget) {
        res.json(Total_Budget)
    }).catch(function(err){
        console.log(err)
    })
});


app.post("/postBudgets", async (req, res) => {
    const user = req.body
    const NewUser = new BudgetModel(user)
    await NewUser.save()

    res.json(user)
})

app.get("/getFestivals", (req, res) => {
    FestivalModel.find({}).then(function(Festival_List) {
        res.json(Festival_List)
    }).catch(function(err){
        console.log(err)
    })
});

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  });
  
  app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
  
    res.json(user);
});

//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})