require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const BudgetModel = require('./models/Total_Budget')
const FestivalModel = require('./models/Festival_List')
const UserModel = require("./models/Users")
const CurrencyModel = require("./models/Currency")
const cors = require('cors')
//const workoutRoutes = require('./routes/workouts')
const router = require('./routes/auth');
const { auth } = require('express-openid-connect');

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
  CurrencyModel.find({}).then(function(Currency) {  // Find all the currencies in the CurrencyModel
    res.json(Currency) // Return the currencies as a JSON response
  }).catch(function(err){
    console.log(err)   // Log any errors to the console
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

app.post("/saveFestivalBudget", (req, res) => {
  const { Ufestival, Ubudget, username } = req.body;

  UserModel.findOneAndUpdate(
    { username },
    { $set: { "activeFestival.Ufestival": Ufestival, "activeFestival.Ubudget": Ubudget } },  // Use atomic operator to set fields
    { new: true }
  )
    .then((user) => {
      res.json({ message: "Festival budget saved successfully", user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error saving festival budget" });
    });
});

const config = {
  authRequired: false,
  auth0Logout: true
};

const port = process.env.PORT;
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${port}/auth`;
}

app.use(auth(config));

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

app.use('/', router);

//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})