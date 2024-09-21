require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const BudgetModel = require('./models/Total_Budget')
const FestivalModel = require('./models/Festival_List')
const UserModel = require("./models/Users")
const CurrencyModel = require("./models/Currency")
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

app.get("/getCurrency", (req, res) => {
  CurrencyModel.find({}).then(function(Currency) {
      res.json(Currency)
  }).catch(function(err){
      console.log(err)
  })
});

app.get("/getFestivals", (req, res) => {
  FestivalModel.find({}).then(function(Festival_List) {
      res.json(Festival_List)
  }).catch(function(err){
      console.log(err)
  })
});

app.post('/calcBudget', (req, res) => {
    const {
      numFamilyMembers,
      budgetPerFamilyMember,
      numFriends,
      budgetPerFriend,
      numTravelers,
      travelCostPerPerson,
      transportation,
      accommodation,
      numMeals,
      costPerMeal,
      food,
      drinks,
      snacks,
      partiesAndEvents,
      iceSkating,
      concerts,
      christmasMarkets,
      wrappingPaper,
      cards,
      indoorDecorations,
      outdoorDecorations,
      lights,
      currency,
      holidayBudget
    } = req.body;

    // Calculating Gifts
    const giftsTotal = (Number(numFamilyMembers) * Number(budgetPerFamilyMember)) +
    (Number(numFriends) * Number(budgetPerFriend));

    // Calculating Travel
    const travelTotal = (Number(numTravelers) * Number(travelCostPerPerson)) +
    Number(transportation) + Number(accommodation);

    // Calculating Food and Drinks
    const foodAndDrinksTotal = (Number(numMeals) * Number(costPerMeal)) +
    Number(food) + Number(drinks) + Number(snacks);

    // Calculating Entertainment
    const entertainmentTotal = Number(partiesAndEvents) + 
    Number(iceSkating) + Number(concerts) + Number(christmasMarkets);

    // Calculating Stationary
    const stationaryTotal = Number(wrappingPaper) + Number(cards);

    // Calculating Decorations
    const decorationsTotal = Number(indoorDecorations) + 
    Number(outdoorDecorations) + Number(lights);

    // Calculating total actual budget
    const totalBudget = giftsTotal + travelTotal + foodAndDrinksTotal + 
    entertainmentTotal + stationaryTotal + decorationsTotal;

    // Calculate difference between holiday budget and actual budget
    const budgetDifference = holidayBudget - totalBudget;

    // Logic for message
  const message = budgetDifference > 0 
  ? `You are within your budget! You saved ${budgetDifference} ${currency}`
  : `You overspent by ${Math.abs(budgetDifference)} ${currency}`;

    res.json({
        totalBudget,
        message
    });
});
  
//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})