import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:5555/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    Axios.post("http://localhost:5555/createUser", {
      name,
      age,
      username,
    }).then((response) => {
      setListOfUsers([
        ...listOfUsers,
        {
          name,
          age,
          username,
        },
      ]);
    });
  };

  return (
    <div className="App">
      <div className="usersDisplay">
        {listOfUsers.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Username: {user.username}</h1>
            </div>
          );
        })}
      </div>

      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <button onClick={createUser}> Create User </button>
      </div>
    </div>
  );
}

//export default App;

//sumanth code
const apiURL = "https://restcountries.com/v3.1"
const SearchInput = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    onSearch(input);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Search a country......"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
};

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);

      if (!res.ok) throw new Error("Not found any country!");

      const data = await res.json();
      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };


return (
  <div className="all__country__wrapper">
    <div className="country__top">
      <div className="search">
        <SearchInput onSearch={getCountryByName} />
      </div>
    </div>

    <div className="country__bottom">
      {isLoading && !error && <h4>Loading........</h4>}
      {error && !isLoading && <h4>{error}</h4>}

      {countries?.map((country) => (
        <Link to={`/country/${country.name.common}`}>
          <div className="country__card">
            <div className="country__img">
              <img src={country.flags.png} alt="" />
            </div>

            <div className="country__data">
              <h3>{country.name.common}</h3>
              <h6>
                {" "}
                Population:{" "}
                {new Intl.NumberFormat().format(country.population)}
              </h6>
              <h6> Region: {country.region}</h6>
              <h6>Capital: {country.capital}</h6>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);
};

export default AllCountries;