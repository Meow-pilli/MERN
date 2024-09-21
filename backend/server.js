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
      currency
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

    const totalBudget = giftsTotal + travelTotal + foodAndDrinksTotal + 
    entertainmentTotal + stationaryTotal + decorationsTotal;

    // Logic for message
  const message = totalBudget < 500 
  ? `You are under Budget of 500 ${currency}`
  : `You are over Budget of 500 ${currency}`;

    res.json({
        totalBudget,
        message
    });
});
  
//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})