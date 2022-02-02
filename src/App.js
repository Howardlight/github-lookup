import { useState } from 'react';
import './App.css';

//Axios
import axios from "axios";

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

import repoCard from "./components/RepoCard";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Display404 from './components/Display404';

function App() {

  const [profile, setProfile] = useState("null");
  const [searchQuery, setSearchQuery] = useState("defunkt");
  const [userExists, setUserExists] = useState(true); 
  const [repos, setRepos] = useState(null);
  //TODO: modify this to be three states,
  // exists does, not exist and onMount(nothing displays)
  

  async function getProfileData(key) {
    const baseUrl = "https://api.github.com/users/";
    await axios(`${baseUrl}${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      setUserExists(true);
      setProfile(response.data);
    })
    .catch(err => {
      setUserExists(false);
      setRepos(null);
      console.log(err)
    })
  }

  async function getRepoData(key) {
    const baseUrl = "https://api.github.com/users/";
    axios(`${baseUrl}${key}/repos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      response = filterRepoData(response.data);
      setRepos(response);
    })
    .catch(err => {console.log(err);})
  }


  // CAN BE USED FOR LATER
  // function toFindDuplicates(arry) {
  //   const uniqueElements = new Set(arry);
  //   const filteredElements = arry.filter(item => {
  //       if (uniqueElements.has(item.id)) {
  //           uniqueElements.delete(item);
  //       } else {
  //           return item;
  //       }
  //   });

  //   return [...new Set(uniqueElements)]
  // }


  // Sorts Array  by stargazers_count ascending
  function filterRepoData(obj) {
    // const duplicateElement = toFindDuplicates(obj);
    // console.log(duplicateElement);
    let temp = null;
    for(let i = 0; i < obj.length; i++){
      for(let j = i+1; j < obj.length; j++){
        if(obj[j].stargazers_count < obj[i].stargazers_count){
          temp = obj[i];
          obj[i] = obj[j];
          obj[j] = temp;
        }
      }
    }
    return obj;
  }


  const DisplayProfile = () => {
    return(
      <div className='ProfileCard'>
        <Container style={{marginTop: "20px", marginBottom: "20px"}}>
          <Paper elevation={10} style={{padding: "20px", paddingLeft:"20px", paddingRight: "20px", display:"flex"}}>
            <Container style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
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

  // CAUTION: THIS COMPONENT REFRESHES EACH TIME SEARCH HAS INPUT
  const DisplayRepos = ({repos}) => {
    let top4 = repos.slice(-4);
    console.log(top4);

    return(<div> {top4.map(repo => {return repoCard(repo)})}</div>);
  }

  // FORM FUNCTIONS
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    await getProfileData(searchQuery);
    await getRepoData(searchQuery);
  }
  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
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


      {userExists ? <DisplayProfile /> : <Display404/>}


      {/* TODO: Make 3 states, 1 for onMount, 1 for if no repos exists ect.., 1 for mapping the Cards and
      displaying them  */}
      {
      repos != null ? 
      <DisplayRepos repos={repos}/> :
      ""
      }
      
      <Footer />
    </Container>
  );
}

export default App;
