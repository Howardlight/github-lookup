import { useState } from 'react';
import './App.css';

function App() {

  const [profile, setProfile] = useState("null");
  const [searchQuery, setSearchQuery] = useState("defunkt");
  // const [error, setError] = useState("");

  
  async function getProfileData(key) {
    const baseUrl = "https://api.github.com/users/";
      fetch(`${baseUrl}${key}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response =>  {return response.json()} )
      .then(data => {
        console.log(data);
        setProfile(data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  // FORM FUNCTIONS
  const handleOnSubmit = (event) => {
    event.preventDefault();
    getProfileData(searchQuery);
  }

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  }

  //TODO: error handling for when fetch yields 404
  //TODO: create a good layout, maybe use a framework like bootstrap
  //TODO: Add animations
  return (
    <div className="App">
        <p>{profile.name}</p>
        <form onSubmit={handleOnSubmit}>
          <input type={"text"} placeholder='Search for a Profile' onChange={handleQueryChange}/>
          <button type='submit'>Search</button>
        </form>
    </div>
  );
}

export default App;
