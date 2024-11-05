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
    setCurrency(event.target.value);
  };

  const handleFestivalChange = (event) => {
    setSelectedFestival(event.target.value);
  }


// State management for each section
const [showTravelOptions, setShowTravelOptions] = useState(false);
const [showGiftsOptions, setShowGiftsOptions] = useState(false);
const [showFoodOptions, setShowFoodOptions] = useState(false);
const [showEntertainmentOptions, setShowEntertainmentOptions] = useState(false);
const [showStationaryOptions, setShowStationaryOptions] = useState(false);
const [showDecorationsOptions, setShowDecorationsOptions] = useState(false);

// Toggle functions for each section
const toggleTravelOptions = () => setShowTravelOptions(!showTravelOptions);
const toggleGiftsOptions = () => setShowGiftsOptions(!showGiftsOptions);
const toggleFoodOptions = () => setShowFoodOptions(!showFoodOptions);
const toggleEntertainmentOptions = () => setShowEntertainmentOptions(!showEntertainmentOptions);
const toggleStationaryOptions = () => setShowStationaryOptions(!showStationaryOptions);
const toggleDecorationsOptions = () => setShowDecorationsOptions(!showDecorationsOptions);

const [selectedFestival, setSelectedFestival] = useState(""); // State for the selected festival

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
        <select id="festivalDropdown" value={selectedFestival} onChange={handleFestivalChange}>
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
          <div className="category gifts" onClick={toggleGiftsOptions}>
            <span>
              <img className="icon" src="/Gifts.png" />
              GIFTS
            </span>
            <span className="icon">{showGiftsOptions ? "▲" : "▼"}</span>
          </div>
          {showGiftsOptions && (
            <div className="options-box gifts-options-box">
              <div className="gifts-grid">
                <div>
                  <label>Number of Family Members</label>
                  <input type="number" value={numFamilyMembers} onChange={(e) => setNumFamilyMembers(e.target.value)} />
                </div>
                <div>
                  <label>Budget per Family Member</label>
                  <input type="number" value={budgetPerFamilyMember} onChange={(e) => setBudgetPerFamilyMember(e.target.value)} />
                </div>
                <div>
                  <label>Number of Friends</label>
                  <input type="number" value={numFriends} onChange={(e) => setNumFriends(e.target.value)} />
                </div>
                <div>
                  <label>Budget per Friend</label>
                  <input type="number" value={budgetPerFriend} onChange={(e) => setBudgetPerFriend(e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Travel Section */}
          <div className="category travel" onClick={toggleTravelOptions}>
            <span>
              <img className="icon" src="/Travel.png" />
              TRAVEL
            </span>
            <span className="icon">{showTravelOptions ? "▲" : "▼"}</span>
          </div>
          {showTravelOptions && (
            <div className="options-box travel-options-box">
              <div className="travel-grid">
                <div>
                  <label>Number of Travelers</label>
                  <input type="number" value={numTravelers} onChange={(e) => setNumTravelers(e.target.value)} />
                </div>
                <div>
                  <label>Travel Cost per Person</label>
                  <input type="number" value={travelCostPerPerson} onChange={(e) => setTravelCostPerPerson(e.target.value)} />
                </div>
                <div>
                  <label>Transportation</label>
                  <input type="number" value={transportation} onChange={(e) => setTransportation(e.target.value)} />
                </div>
                <div>
                  <label>Accommodation</label>
                  <input type="number" value={accommodation} onChange={(e) => setAccommodation(e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Food & Drinks Section */}
          <div className="category food" onClick={toggleFoodOptions}>
            <span>FOOD & DRINKS</span>
            <span className="icon">{showFoodOptions ? "▲" : "▼"}</span>
          </div>
          {showFoodOptions && (
            <div className="options-box food-options-box">
              <div className="food-grid">
                <div>
                  <label>Number of Meals</label>
                  <input type="number" value={numMeals} onChange={(e) => setNumMeals(e.target.value)} />
                </div>
                <div>
                  <label>Cost per Meal</label>
                  <input type="number" value={costPerMeal} onChange={(e) => setCostPerMeal(e.target.value)} />
                </div>
                <div>
                  <label>Food</label>
                  <input type="number" value={food} onChange={(e) => setFood(e.target.value)} />
                </div>
                <div>
                  <label>Drinks</label>
                  <input type="number" value={drinks} onChange={(e) => setDrinks(e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Entertainment Section */}
          <div className="category entertainment" onClick={toggleEntertainmentOptions}>
            <span>
              <img className="icon" src="/Entertainment.png" />
              ENTERTAINMENT
            </span>
            <span className="icon">{showEntertainmentOptions ? "▲" : "▼"}</span>
          </div>
          {showEntertainmentOptions && (
            <div className="options-box entertainment-options-box">
              <div className="entertainment-grid">
                <div>
                  <label>Parties and Events</label>
                  <input type="number" value={partiesAndEvents} onChange={(e) => setPartiesAndEvents(e.target.value)} />
                </div>
                <div>
                  <label>Ice Skating</label>
                  <input type="number" value={iceSkating} onChange={(e) => setIceSkating(e.target.value)} />
                </div>
                <div>
                  <label>Concerts/Pageants</label>
                  <input type="number" value={concerts} onChange={(e) => setConcerts(e.target.value)} />
                </div>
                <div>
                  <label>Christmas Markets</label>
                  <input type="number" value={christmasMarkets} onChange={(e) => setChristmasMarkets(e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Stationary & Packaging Section */}
          <div className="category stationary" onClick={toggleStationaryOptions}>
            <span>
              <img className="icon" src="/Stationery.png" />
              STATIONERY & PACKAGING
            </span>
            <span className="icon">{showStationaryOptions ? "▲" : "▼"}</span>
          </div>
          {showStationaryOptions && (
            <div className="options-box stationary-options-box">
              <div className="stationary-grid">
                <div>
                  <label>Wrapping Paper</label>
                  <input type="number" value={wrappingPaper} onChange={(e) => setWrappingPaper(e.target.value)} />
                </div>
                <div>
                  <label>Cards</label>
                  <input type="number" value={cards} onChange={(e) => setCards(e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Decorations Section */}
          <div className="category decorations" onClick={toggleDecorationsOptions}>
            <span>DECORATIONS</span>
            <span className="icon">{showDecorationsOptions ? "▲" : "▼"}</span>
          </div>
          {showDecorationsOptions && (
            <div className="options-box decorations-options-box">
              <div className="decorations-grid">
                <div>
                  <label>Indoor Decorations</label>
                  <input type="number" value={indoorDecorations} onChange={(e) => setIndoorDecorations(e.target.value)} />
                </div>
                <div>
                  <label>Outdoor Decorations</label>
                  <input type="number" value={outdoorDecorations} onChange={(e) => setOutdoorDecorations(e.target.value)} />
                </div>
                <div>
                  <label>Lights</label>
                  <input type="number" value={lights} onChange={(e) => setLights(e.target.value)} />
                </div>
              </div>
            </div>
          )}

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
