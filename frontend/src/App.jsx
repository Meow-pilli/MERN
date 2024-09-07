import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listOfBudget, setListOfBudget] = useState([]);
  const [age, setAge] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfBudget(response.data);
    });
  }, []);

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      age,
    }).then((response) => {
      setListOfBudget([
        ...listOfUsers,
        {
          age,
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
              <h1>Age: {user.age}</h1>
            </div>
          );
        })}
      </div>

      <div>
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <button onClick={createUser}> Create User </button>
      </div>
    </div>
  );
}

export default App;