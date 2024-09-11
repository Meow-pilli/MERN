import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function Users() {
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

//Total Budget Calculator

function Budget() {

  // state
  const [Gifts, setGifts] = useState(0)
  const [Travel, setTravel] = useState(0)
  const [FoodnDrinks, setFoodnDrinks] = useState(0)
  const [Entertainment, setEntertainment] = useState(0)
  const [Decorations, setDecorations] = useState(0)
  const [CostumesnClothing, setCostumesnClothing] = useState(0)
  const [StationarynPacking, setStationarynPacking] = useState(0)
  const [CharitablenContributions, setCharitablenContributions] = useState(0)
  const [Budget, setBudget] = useState('')
  const [message, setMessage] = useState('')



  let calcBudget = (event) => {
    //prevent suBudgettting
    event.preventDefault()

    if (Gifts === 0 || Travel === 0) {
      alert('Please enter a valid weight and Travel')
    } else {
      let Budget = (Number(Gifts) + Number(Travel) + Number(FoodnDrinks) + Number(Entertainment) + Number(Decorations)
    + Number(CostumesnClothing)+ Number(StationarynPacking) + Number(CharitablenContributions))
      setBudget(Budget)

      // Logic for message

      if (Budget < 500) {
        setMessage('You are under Budget of 500')
      } else {
        setMessage('You are over Budget of 500')
      }
    }
  }

  //  show image based on Budget calculation


  let reload = () => {
    window.location.reload()
  }

  return (
    <div className="app">
      <div className='container'>
        <h2 className='center'>Budget Calculator</h2>
        <form onSubmit={calcBudget}>
          <div>
            <label>Gifts</label>
            <input value={Gifts} onChange={(e) => setGifts(e.target.value)} />
          </div>
          <div>
            <label>Travel</label>
            <input value={Travel} onChange={(event) => setTravel(event.target.value)} />
          </div>
          <div>
            <label>Food and Drinks</label>
            <input value={FoodnDrinks} onChange={(e) => setFoodnDrinks(e.target.value)} />
          </div>
          <div>
            <label>Entertainment</label>
            <input value={Entertainment} onChange={(e) => setEntertainment(e.target.value)} />
          </div>
          <div>
            <label>Decorations</label>
            <input value={Decorations} onChange={(e) => setDecorations(e.target.value)} />
          </div>
          <div>
            <label>Costumes Clothing</label>
            <input value={CostumesnClothing} onChange={(e) => setCostumesnClothing(e.target.value)} />
          </div>
          <div>
            <label>Stationary and Packing</label>
            <input value={StationarynPacking} onChange={(e) => setStationarynPacking(e.target.value)} />
          </div>
          <div>
            <label>Charitable Contributions</label>
            <input value={CharitablenContributions} onChange={(e) => setCharitablenContributions(e.target.value)} />
          </div>
          <div>
            <button className='btn' type='submit'>Submit</button>
            <button className='btn btn-outline' onClick={reload} type='submit'>Reload</button>
          </div>
        </form>

        <div className='center'>
          <h3>Your Budget is: {Budget}</h3>
          <p>{message}</p>
        </div>

      </div>
    </div>
  );
}

export default Budget;