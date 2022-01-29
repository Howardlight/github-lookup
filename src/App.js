import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {

  // init States
  const [profile, setProfile] = useState("null");
  const [profileKey, setProfileKey] = useState("defunkt");

  // Fetch Item
  useEffect(() => {
    const baseUrl = "https://api.github.com/users/";
    fetch(`${baseUrl}${profileKey}`, {
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
  },[profileKey]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {profile.name}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
