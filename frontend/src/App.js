// import React, { useEffect, useState } from "react";
// import "./App.css";
// import Axios from "axios";

// function Budget() {
//   // State for input fields
//   const [numFamilyMembers, setNumFamilyMembers] = useState(0);
//   const [budgetPerFamilyMember, setBudgetPerFamilyMember] = useState(0);
//   const [numFriends, setNumFriends] = useState(0);
//   const [budgetPerFriend, setBudgetPerFriend] = useState(0);

//   const [numTravelers, setNumTravelers] = useState(0);
//   const [travelCostPerPerson, setTravelCostPerPerson] = useState(0);
//   const [transportation, setTransportation] = useState(0);
//   const [accommodation, setAccommodation] = useState(0);

//   const [numMeals, setNumMeals] = useState(0);
//   const [costPerMeal, setCostPerMeal] = useState(0);
//   const [food, setFood] = useState(0);
//   const [drinks, setDrinks] = useState(0);
//   const [snacks, setSnacks] = useState(0);

//   const [partiesAndEvents, setPartiesAndEvents] = useState(0);
//   const [iceSkating, setIceSkating] = useState(0);
//   const [concerts, setConcerts] = useState(0);
//   const [christmasMarkets, setChristmasMarkets] = useState(0);

//   const [wrappingPaper, setWrappingPaper] = useState(0);
//   const [cards, setCards] = useState(0);

//   const [indoorDecorations, setIndoorDecorations] = useState(0);
//   const [outdoorDecorations, setOutdoorDecorations] = useState(0);
//   const [lights, setLights] = useState(0);

//   // State variables for holiday budget and calculations
//   const [holidayBudget, setHolidayBudget] = useState(0);  // User-input holiday budget
//   const [actualBudget, setActualBudget] = useState(0);    // Calculated actual budget
//   //const [budgetDifference, setbudgetDifference] = useState(0);        // Difference between holiday and actual budget
//   const [message, setMessage] = useState('');             // Message based on overspending or underspending

//   const [currency, setCurrency] = useState('USD');        // Currency state
//   const [currencies, setCurrencies] = useState([]);
//   const [selectedCurrency, setSelectedCurrency] = useState("");       // Currencies array from JSON

//   const [festivals, setFestivals] = useState([]);

//   useEffect(() => {
//     Axios.get("http://localhost:5555/getFestivals").then((response) => {
//       setFestivals(response.data);
//     });
//   }, []);

//   const handleCurrencyChange = (event) => {
//     setSelectedCurrency(event.target.value);}

//   // Fetch currencies from Database
//   useEffect(() => {
//     Axios.get("http://localhost:5555/getCurrency").then((response) => {
//       setCurrencies(response.data);
//     });
//   }, []);

//   const calcBudget = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await Axios.post('http://localhost:5555/calcBudget', {
//         numFamilyMembers,
//         budgetPerFamilyMember,
//         numFriends,
//         budgetPerFriend,
//         numTravelers,
//         travelCostPerPerson,
//         transportation,
//         accommodation,
//         numMeals,
//         costPerMeal,
//         food,
//         drinks,
//         snacks,
//         partiesAndEvents,
//         iceSkating,
//         concerts,
//         christmasMarkets,
//         wrappingPaper,
//         cards,
//         indoorDecorations,
//         outdoorDecorations,
//         lights,
//         currency,
//         holidayBudget
//       });

//       setActualBudget(response.data.totalBudget);
//       setMessage(response.data.message);
//     } catch (error) {
//       console.error('Error calculating budget', error);
//       setMessage('Error calculating budget');
//     }
//   };

//   let reload = () => {
//     window.location.reload();
//   };

//   return (
//     <div className="app">
//       <div className="container">
//         <h2 className="center">Holiday Budget Calculator</h2>

//         {/* Festival Dropdown */}
//         <label>Select Festival:</label>
//         <select id="festivalDropdown">
//             <option value="">festival</option>
//             {festivals?.map((festival) => (
//                 <option key={festival._id.$oid} value={festival._id.$oid}>
//                     {`${festival.Name}`}
//                 </option>
//             ))}
//         </select>

//         {/* Currency Dropdown */}
//         <div>
//       <label htmlFor="currency-select">Select Currency:</label>
//       <select id="currency-select" value={selectedCurrency} onChange={handleCurrencyChange}>
//         <option value="">Currency</option>
//         {currencies?.map((currency) => (
//           <option key={currency.code} value={currency.code}>
//             {currency.name} ({currency.symbol})
//           </option>
//         ))}
//       </select>
//     </div>

//         {/* Holiday Budget Input */}
//         <div>
//           <label>Enter your Holiday Budget</label>
//           <input type="number" value={holidayBudget} onChange={(e) => setHolidayBudget(Number(e.target.value))} />
//         </div>

//         <form onSubmit={calcBudget}>
//           {/* Gifts Section */}
//           <div>
//             <h3>Gifts</h3>
//             <label>Number of Family Members</label>
//             <input type="number" value={numFamilyMembers} onChange={(e) => setNumFamilyMembers(e.target.value)} />
//             <label>Budget per Family Member</label>
//             <input type="number" value={budgetPerFamilyMember} onChange={(e) => setBudgetPerFamilyMember(e.target.value)} />

//             <label>Number of Friends</label>
//             <input type="number" value={numFriends} onChange={(e) => setNumFriends(e.target.value)} />
//             <label>Budget per Friend</label>
//             <input type="number" value={budgetPerFriend} onChange={(e) => setBudgetPerFriend(e.target.value)} />
//           </div>

//           {/* Travel Section */}
//           <div>
//             <h3>Travel</h3>
//             <label>Number of Travelers</label>
//             <input type="number" value={numTravelers} onChange={(e) => setNumTravelers(e.target.value)} />
//             <label>Travel Cost per Person</label>
//             <input type="number" value={travelCostPerPerson} onChange={(e) => setTravelCostPerPerson(e.target.value)} />

//             <label>Transportation</label>
//             <input type="number" value={transportation} onChange={(e) => setTransportation(e.target.value)} />
//             <label>Accommodation</label>
//             <input type="number" value={accommodation} onChange={(e) => setAccommodation(e.target.value)} />
//           </div>

//           {/* Food and Drinks Section */}
//           <div>
//             <h3>Food and Drinks</h3>
//             <label>Number of Meals</label>
//             <input type="number" value={numMeals} onChange={(e) => setNumMeals(e.target.value)} />
//             <label>Cost per Meal</label>
//             <input type="number" value={costPerMeal} onChange={(e) => setCostPerMeal(e.target.value)} />
//             <label>Food</label>
//             <input type="number" value={food} onChange={(e) => setFood(e.target.value)} />
//             <label>Drinks</label>
//             <input type="number" value={drinks} onChange={(e) => setDrinks(e.target.value)} />
//             <label>Snacks</label>
//             <input type="number" value={snacks} onChange={(e) => setSnacks(e.target.value)} />
//           </div>

//           {/* Entertainment Section */}
//           <div>
//             <h3>Entertainment</h3>
//             <label>Parties and Events</label>
//             <input type="number" value={partiesAndEvents} onChange={(e) => setPartiesAndEvents(e.target.value)} />
//             <label>Ice Skating</label>
//             <input type="number" value={iceSkating} onChange={(e) => setIceSkating(e.target.value)} />
//             <label>Concerts/Pageants</label>
//             <input type="number" value={concerts} onChange={(e) => setConcerts(e.target.value)} />
//             <label>Christmas Markets</label>
//             <input type="number" value={christmasMarkets} onChange={(e) => setChristmasMarkets(e.target.value)} />
//           </div>

//           {/* Stationary Section */}
//           <div>
//             <h3>Stationary</h3>
//             <label>Wrapping Paper</label>
//             <input type="number" value={wrappingPaper} onChange={(e) => setWrappingPaper(e.target.value)} />
//             <label>Cards</label>
//             <input type="number" value={cards} onChange={(e) => setCards(e.target.value)} />
//           </div>

//           {/* Decorations Section */}
//           <div>
//             <h3>Decorations</h3>
//             <label>Indoor Decorations</label>
//             <input type="number" value={indoorDecorations} onChange={(e) => setIndoorDecorations(e.target.value)} />
//             <label>Outdoor Decorations</label>
//             <input type="number" value={outdoorDecorations} onChange={(e) => setOutdoorDecorations(e.target.value)} />
//             <label>Lights</label>
//             <input type="number" value={lights} onChange={(e) => setLights(e.target.value)} />
//           </div>

//           {/* Submit Button */}
//           <button type="submit">Calculate Budget</button>
//         </form>

//         {/* Display Results */}
//         <div className="result">
//           <h2>Results</h2>
//           <p>Actual Budget: {actualBudget} {currency}</p>
//           <p>{message}</p>
//           <button onClick={reload}>Reload</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Budget;

import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import useSWR from "swr";
const service = {
  base_url: process.env.REACT_APP_BASE_URL ?? "http://localhost:5555",
};

const Axios = axios.create({
  baseURL: service.base_url,
});

// const axiosConfig = {
//   baseURL: service.base_url,
// };

/**
 * @typedef {{name,price}}} Gift
 */

function Budget() {
  const { data: giftOptions, error } = useSWR("/gifts", (url) => Axios.get(url).then((response) => /**@type {Gift[]} */ (response.data)));
  const { data: festivals, error: festivalsError } = useSWR("/getFestivals", (url) => Axios.get(url).then((response) => response.data));
  const { data: currencies, error: currenciesError } = useSWR("/getCurrency", (url) => Axios.get(url).then((response) => response.data));

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

  const [holidayBudget, setHolidayBudget] = useState(0);
  const [actualBudget, setActualBudget] = useState(0);
  const [message, setMessage] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const calcBudget = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post("/calcBudget", {
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
        holidayBudget,
      });

      setActualBudget(response.data.totalBudget);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error calculating budget", error);
      setMessage("Error calculating budget");
    }
  };

  let reload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="container">
        <div className="center">
          <img
            src={require("./Black.png")}
            alt="Holiday Tracker"
            className="logo-image"
            style={{
              height: "100px",
              objectFit: "cover",
              objectPosition: "center center",
              width: "100%",
            }}
          />
        </div>

        <label>Select Festival:</label>
        <select id="festivalDropdown">
          <option value="">Select Festival</option>
          {festivals?.map((festival) => (
            <option key={festival._id.$oid} value={festival._id.$oid}>
              {`${festival.Name}`}
            </option>
          ))}
        </select>

        <div>
          <label htmlFor="currency-select">Select Currency:</label>
          <select id="currency-select" value={selectedCurrency} onChange={handleCurrencyChange}>
            <option value="">Currency</option>
            {currencies?.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Enter your Holiday Budget</label>
          <input type="number" value={holidayBudget} onChange={(e) => setHolidayBudget(Number(e.target.value))} />
        </div>

        <form onSubmit={calcBudget}>
          {/* Gifts Section */}
          <div className="category gifts">
            <span>GIFTS</span>
            <span className="icon">▼</span>
            <label>Select Gift Options:</label>
            <select>
              {giftOptions?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
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
          <div className="category travel">
            <span>TRAVEL</span>
            <span className="icon">▼</span>
          </div>
          <div>
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
          <div className="category food">
            <span>FOOD & DRINKS</span>
            <span className="icon">▼</span>
          </div>
          <div>
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
          <div className="category entertainment">
            <span>ENTERTAINMENT</span>
            <span className="icon">▼</span>
          </div>
          <div>
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
          <div className="category stationary">
            <span>STATIONERY & PACKAGING</span>
            <span className="icon">▼</span>
          </div>
          <div>
            <label>Wrapping Paper</label>
            <input type="number" value={wrappingPaper} onChange={(e) => setWrappingPaper(e.target.value)} />
            <label>Cards</label>
            <input type="number" value={cards} onChange={(e) => setCards(e.target.value)} />
          </div>

          {/* Decorations Section */}
          <div className="category decorations">
            <span>DECORATIONS</span>
            <span className="icon">▼</span>
          </div>
          <div>
            <label>Indoor Decorations</label>
            <input type="number" value={indoorDecorations} onChange={(e) => setIndoorDecorations(e.target.value)} />
            <label>Outdoor Decorations</label>
            <input type="number" value={outdoorDecorations} onChange={(e) => setOutdoorDecorations(e.target.value)} />
            <label>Lights</label>
            <input type="number" value={lights} onChange={(e) => setLights(e.target.value)} />
          </div>

          {/* Submit Button */}
          <button type="submit">Calculate Budget</button>
        </form>

        {/* Display Results */}
        <div className="result">
          <h2>Results</h2>
          <p>
            Actual Budget: {actualBudget} {currency}
          </p>
          <p>{message}</p>
          <button onClick={reload}>Reload</button>
        </div>
      </div>
    </div>
  );
}

export default Budget;
