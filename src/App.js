import { useState } from 'react';
import './App.css';

function App() {

  const [profile, setProfile] = useState("null");
  const [searchQuery, setSearchQuery] = useState("defunkt");
  const [userExists, setUserExists] = useState(true); 
  //TODO: modify this to be three states,
  // exists does, not exist and onMount(nothing displays)
  // const [error, setError] = useState("");

  // helper Func, used in getProfileData 
  function handleErrors(response) {
    if(!response.ok) {
      setUserExists(false);
      throw Error(response.statusText);
    }
    return response;
  }

  async function getProfileData(key) {
    const baseUrl = "https://api.github.com/users/";
    fetch(`${baseUrl}${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(handleErrors)
    .then(response =>  {return response.json()} )
    .then(data => {
      // console.log(data);
      setProfile(data);
    })
    .catch(err => {
      // setUserExists(false);
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


  const DisplayProfile = () => {
    return(
      <div>
          <p>Login Name: {profile.login}</p>
          <p>Name: {profile.name}</p>
          <p>Created at: {profile.created_at}</p>
          <p>Followers: {profile.followers}</p>
          <p>Repo count: {profile.public_repos}</p>
          <img src={profile.avatar_url} alt={"Profile IMG"}/>
      </div>
    );  
}

  //TODO: error handling for when fetch yields 404
  //TODO: create a good layout, maybe use a framework like bootstrap
  //TODO: Add animations
  //TODO: Create func that will get top 4 repos, use https://api.github.com/users/Howardlight/repos
  return (
    <div className="App">
        <form onSubmit={handleOnSubmit}>
          <input type={"text"} placeholder='Search for a Profile' onChange={handleQueryChange}/>
          <button type='submit'>Search</button>
        </form>
        {userExists ? <DisplayProfile /> : "404: USER NOT FOUND"}
        
    </div>
  );
}

export default App;
