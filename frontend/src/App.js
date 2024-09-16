import React, { useState } from "react";
import "./App.css";
import Axios from "axios";

function Budget() {
  // state
  const [numFamilyMembers, setNumFamilyMembers] = useState(0);
  const [budgetPerFamilyMember, setBudgetPerFamilyMember] = useState(0);
  const [numFriends, setNumFriends] = useState(0);
  const [budgetPerFriend, setBudgetPerFriend] = useState(0);
  
  const [numTravelers, setNumTravelers] = useState(0);
  const [travelCostPerPerson, setTravelCostPerPerson] = useState(0);
  const [transportation, setTransportation] = useState(0);
  const [accommodation, setAccommodation] = useState(0);
  
  const [numMeals, setNumMeals] = useState(0);
  const [costPerMeal, setCostPerMeal] = useState(0);
  const [food, setFood] = useState(0);
  const [drinks, setDrinks] = useState(0);
  const [snacks, setSnacks] = useState(0);

  const [partiesAndEvents, setPartiesAndEvents] = useState(0);
  const [iceSkating, setIceSkating] = useState(0);
  const [concerts, setConcerts] = useState(0);
  const [christmasMarkets, setChristmasMarkets] = useState(0);

  const [wrappingPaper, setWrappingPaper] = useState(0);
  const [cards, setCards] = useState(0);

  const [indoorDecorations, setIndoorDecorations] = useState(0);
  const [outdoorDecorations, setOutdoorDecorations] = useState(0);
  const [lights, setLights] = useState(0);

  const [currency, setCurrency] = useState('USD');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');

  // Top 40 currencies list
  const currencies = [
    "USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD",
    "MXN", "SGD", "HKD", "NOK", "KRW", "TRY", "INR", "RUB", "BRL", "ZAR",
    "DKK", "PLN", "TWD", "THB", "MYR", "IDR", "CZK", "HUF", "ILS", "CLP",
    "PHP", "AED", "COP", "SAR", "PEN", "VND", "PKR", "EGP", "BDT", "KWD", "QAR"
  ];

  let calcBudget = (event) => {
    // prevent submitting
    event.preventDefault();

    // Calculating Gifts
    let giftsTotal = (Number(numFamilyMembers) * Number(budgetPerFamilyMember)) +
                    (Number(numFriends) * Number(budgetPerFriend));

    // Calculating Travel
    let travelTotal = (Number(numTravelers) * Number(travelCostPerPerson)) +
                      Number(transportation) + Number(accommodation);

    // Calculating Food and Drinks
    let foodAndDrinksTotal = (Number(numMeals) * Number(costPerMeal)) +
                             Number(food) + Number(drinks) + Number(snacks);

    // Calculating Entertainment
    let entertainmentTotal = Number(partiesAndEvents) + 
                             Number(iceSkating) + Number(concerts) + 
                             Number(christmasMarkets);

    // Calculating Stationary
    let stationaryTotal = Number(wrappingPaper) + Number(cards);

    // Calculating Decorations
    let decorationsTotal = Number(indoorDecorations) + 
                           Number(outdoorDecorations) + Number(lights);

    let totalBudget = giftsTotal + travelTotal + foodAndDrinksTotal + 
                      entertainmentTotal + stationaryTotal + decorationsTotal;
    
    setBudget(totalBudget);

    // Logic for message
    if (totalBudget < 500) {
      setMessage(`You are under Budget of 500 ${currency}`);
    } else {
      setMessage(`You are over Budget of 500 ${currency}`);
    }
  };

  let reload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">Budget Calculator</h2>

        {/* Currency Dropdown */}
        <div>
          <label>Select Currency</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {currencies.map((curr) => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </select>
        </div>

        <form onSubmit={calcBudget}>
          {/* Gifts Section */}
          <div>
            <h3>Gifts</h3>
            <label>Number of Family Members</label>
            <input type="number" value={numFamilyMembers} onChange={(e) => setNumFamilyMembers(e.target.value)} />
            <label>Budget per Family Member</label>
            <input type="number" value={budgetPerFamilyMember} onChange={(e) => setBudgetPerFamilyMember(e.target.value)} />
            
            <label>Number of Friends</label>
            <input type="number" value={numFriends} onChange={(e) => setNumFriends(e.target.value)} />
            <label>Budget per Friend</label>
            <input type="number" value={budgetPerFriend} onChange={(e) => setBudgetPerFriend(e.target.value)} />
          </div>

          {/* Travel Section */}
          <div>
            <h3>Travel</h3>
            <label>Number of Travelers</label>
            <input type="number" value={numTravelers} onChange={(e) => setNumTravelers(e.target.value)} />
            <label>Travel Cost per Person</label>
            <input type="number" value={travelCostPerPerson} onChange={(e) => setTravelCostPerPerson(e.target.value)} />
            
            <label>Transportation</label>
            <input type="number" value={transportation} onChange={(e) => setTransportation(e.target.value)} />
            <label>Accommodation</label>
            <input type="number" value={accommodation} onChange={(e) => setAccommodation(e.target.value)} />
          </div>

          {/* Food and Drinks Section */}
          <div>
            <h3>Food and Drinks</h3>
            <label>Number of Meals</label>
            <input type="number" value={numMeals} onChange={(e) => setNumMeals(e.target.value)} />
            <label>Cost per Meal</label>
            <input type="number" value={costPerMeal} onChange={(e) => setCostPerMeal(e.target.value)} />
            
            <label>Food</label>
            <input type="number" value={food} onChange={(e) => setFood(e.target.value)} />
            <label>Drinks</label>
            <input type="number" value={drinks} onChange={(e) => setDrinks(e.target.value)} />
            <label>Snacks</label>
            <input type="number" value={snacks} onChange={(e) => setSnacks(e.target.value)} />
          </div>

          {/* Entertainment Section */}
          <div>
            <h3>Entertainment</h3>
            <label>Parties and Events</label>
            <input type="number" value={partiesAndEvents} onChange={(e) => setPartiesAndEvents(e.target.value)} />
            
            <label>Ice Skating</label>
            <input type="number" value={iceSkating} onChange={(e) => setIceSkating(e.target.value)} />
            <label>Concerts/Pageants</label>
            <input type="number" value={concerts} onChange={(e) => setConcerts(e.target.value)} />
            <label>Christmas Markets</label>
            <input type="number" value={christmasMarkets} onChange={(e) => setChristmasMarkets(e.target.value)} />
          </div>

          {/* Stationary Section */}
          <div>
            <h3>Stationary</h3>
            <label>Wrapping Paper</label>
            <input type="number" value={wrappingPaper} onChange={(e) => setWrappingPaper(e.target.value)} />
            <label>Cards</label>
            <input type="number" value={cards} onChange={(e) => setCards(e.target.value)} />
          </div>

          {/* Decorations Section */}
          <div>
            <h3>Decorations</h3>
            <label>Indoor Decorations</label>
            <input type="number" value={indoorDecorations} onChange={(e) => setIndoorDecorations(e.target.value)} />
            
            <label>Outdoor Decorations</label>
            <input type="number" value={outdoorDecorations} onChange={(e) => setOutdoorDecorations(e.target.value)} />
            <label>Lights</label>
            <input type="number" value={lights} onChange={(e) => setLights(e.target.value)} />
          </div>

          <div className="center">
            <button type="submit" className="btn">Calculate</button>
            <button type="button" className="btn" onClick={reload}>Reload</button>
          </div>

        </form>

        {/* Budget Display */}
        <div>
          <h2>Total Budget: {budget} {currency}</h2>
          <h3>{message}</h3>
        </div>
      </div>
    </div>
  );
}

export default Budget;
