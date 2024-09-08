import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listOfFestivals, setListOfFestivals] = useState([]);
  const [Date, setDate] = useState("");
  const [Name, setName] = useState("");
  const [Type, setType] = useState("");
  const [Country_Name, setCountry_Name] = useState("");
  const [Country_Code, setCountry_Code] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:5555/getFestivals").then((response) => {
      setListOfFestivals(response.data);
    });
  }, []);

  const createFestival = () => {
    Axios.post("http://localhost:5555/PostFestivals", {
      Date,
      Name,
      Type,
      Country_Name,
      Country_Code,
    }).then((response) => {
      setListOfFestivals([
        ...listOfFestivals,
        {
          Date,
          Name,
          Type,
          Country_Name,
          Country_Code,
        },
      ]);
    });
  };

  return (
    <div className="App">
      <div className="FestivalsDisplay">
        {listOfFestivals.map((festival) => {
          return (
            <div>
              <h1>Date: {festival.date}</h1>
              <h1>Name: {festival.name}</h1>
              <h1>Type: {festival.type}</h1>
              <h1>Country_Name: {festival.country_Name}</h1>
              <h1>Country_Code: {festival.country_Code}</h1>
            </div>
          );
        })}
      </div>

      <div>
        <input
          type="text"
          placeholder="Date..."
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Type..."
          onChange={(event) => {
            setType(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Country Name..."
          onChange={(event) => {
            setCountry_Name(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Country Code..."
          onChange={(event) => {
            setCountry_Code(event.target.value);
          }}
        />
        <button onClick={createFestival}> Create Festival </button>
      </div>
    </div>
  );
}

export default App;