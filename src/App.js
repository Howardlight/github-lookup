import { useState } from 'react';
import './App.css';

//Material UI
import {
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  Paper,
  Card,
  CardActionArea,
} from "@mui/material";

// ICONS
import WarningIcon from '@mui/icons-material/Warning';

import repoCard from "./components/RepoCard";
import Footer from "./components/Footer";

function App() {

  const [profile, setProfile] = useState("null");
  const [searchQuery, setSearchQuery] = useState("defunkt");
  const [userExists, setUserExists] = useState(true); 
  const [repos, setRepos] = useState(null);
  //TODO: modify this to be three states,
  // exists does, not exist and onMount(nothing displays)


  // helper Func, used in getProfileData 
  function handleErrors(response) {
    if(!response.ok) {
      setUserExists(false);
      throw Error(response.statusText);
    }
    return response;
  }

  function getProfileData(key) {
    const baseUrl = "https://api.github.com/users/";
    fetch(`${baseUrl}${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(handleErrors)
    .then(response => {return response.json()})
    .then(data => {
      // console.log(data);
      setUserExists(true);
      setProfile(data);
    })
    .catch(err => console.log(err)) // It should not reach this point, handle errors will catch it
  }

  async function getRepoData(key) {
    const baseUrl = "https://api.github.com/users/";
    fetch(`${baseUrl}${key}/repos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(handleErrors)
    .then(response => {return response.json()})
    .then(data => {
      // console.log(data);


      // return filterRepoData(data);
      data = filterRepoData(data);
      setRepos(data);
      // console.log(repos);
      // setUserExists(true);
      // setProfile(data);
    })
    .catch(err => console.log(err)) // It should not reach this point, handle errors will catch it
  }
  // Sorts Array  by stargazers_count ascending
  function filterRepoData(obj) {

    // const duplicateElement = toFindDuplicates(obj);
    // console.log(duplicateElement);

    let temp = null;
    for(let i = 0; i < obj.length; i++){
      for(let j = i+1; j < obj.length; j++){
        // if(obj[j] === undefined) continue;
        
        if(obj[j].stargazers_count < obj[i].stargazers_count){
          temp = obj[i];
          obj[i] = obj[j];
          obj[j] = temp;
        }
      }
    }
    return obj;
  }

  // FORM FUNCTIONS
  const handleOnSubmit = (event) => {
    event.preventDefault();
    getProfileData(searchQuery);
  }
  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const Hero = () => {
    return(
      <Typography variant="h4" component="h1" gutterBottom>
        Github Profiles
      </Typography>
    );
  }

  const DisplayProfile = () => {
    return(
      <div className='ProfileCard'>
        <Container style={{marginTop: "20px", marginBottom: "20px"}}>
          <Paper elevation={10} style={{padding: "20px", paddingLeft:"10px", paddingRight: "10px", display:"flex"}}>
            <Container>
              <Typography>Login Name: {profile.login}</Typography>
              <Typography>Name: {profile.name}</Typography>
              <Typography>Created at: {profile.created_at}</Typography>
              <Typography>Followers: {profile.followers}</Typography>
              <Typography>Repo count: {profile.public_repos}</Typography>
            </Container>
            <Avatar src={profile.avatar_url} variant="rounded" alt={"Profile IMG"} sx={{ width: 128, height: 128}}/>
          </Paper>
        </Container>
      </div>
    );  
  }

  const DisplayRepos = ({repos}) => {
    let top4 = repos.slice(-4);
    console.log(top4);

    return(<div> {top4.map(repo => {return repoCard(repo)})}</div>);
  }

  // TODO improve this
  const Display404 = () => {
    return(
      <div className='ProfileCard'>
        <Container style={{marginTop: "20px", marginBottom: "20px"}}>
          <Paper elevation={10} style={{padding: "20px", paddingLeft:"20px", paddingRight: "20px", display:"flex"}}>
            <Container style={{padding: "30px"}}>
              <Typography variant="h5" style={{display: "inline-flex", alignItems: "center"}}><WarningIcon fontSize="large" color="warning"/>404: User not found</Typography>
            </Container>
          </Paper>
        </Container>
      </div>
    );
  }

  //TODO: create a good layout, maybe use a framework like bootstrap
  //TODO: Add animations
  //TODO: Create func that will get top 4 repos, use https://api.github.com/users/Howardlight/repos
  //TODO: Turn the 404 into a Component, use Material UI
  //TODO: add light mode/ dark mode
  return (
    <Container className="App" maxWidth="sm">
      <Hero />



        <div className='Form' style={{margin: "1em", display: "flex", justifyContent: "center"}}>
          <form onSubmit={handleOnSubmit}>
            <TextField color="primary" variant="outlined" label="Github Profile" type='text' onChange={handleQueryChange}/>
            <Button style={{minHeight: "55px", marginLeft: "10px"}} size="large" variant="contained" type='submit'>Search</Button>
          </form>
        </div>


        {userExists ? <DisplayProfile /> : "404: USER NOT FOUND"}


        <Footer />

      </Container>
  );
}

export default App;
