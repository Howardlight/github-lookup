// React
import { 
  useState,
  useContext,
  createContext,
  useMemo,
} from 'react';
import './App.css';

//Material UI
import {
  TextField,
  Button,
  Container,
  createTheme,
  useTheme,
  ThemeProvider,
  Grid,
} from "@mui/material";
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { CssBaseline } from '@mui/material';

// Components
import RepoCard from "./components/RepoCard";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Display404 from './components/Display404';
import { DisplayProfile } from './components/DisplayProfile';
import { getProfileData, getRepoData } from './components/Utils';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
function App() {

  const [profile, setProfile] = useState("null");
  const [searchQuery, setSearchQuery] = useState("defunkt");
  const [userExists, setUserExists] = useState(true); 
  const [repos, setRepos] = useState(null);


  // CAUTION: THIS COMPONENT REFRESHES EACH TIME SEARCH HAS INPUT
  const DisplayRepos = ({repos}) => {
    let top4 = repos.slice(-4);
    top4 = top4.reverse();
    // console.log(top4);

    return(<div> {top4.map(repo => {return RepoCard(repo)})}</div>);
  }

  // FORM FUNCTIONS
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const profile = await getProfileData(searchQuery);
    if(profile != null){ // if object exists
      setUserExists(true);
      setProfile(profile);
    } else {
      setUserExists(false);
      setRepos(null);
    }
    
    if(profile != null){
      const repositories = await getRepoData(searchQuery);
      if(repositories != null){ // if repositories exist
        setRepos(repositories);
      } else {
        setRepos(null);
      }
    }
  }
  const handleQueryChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  }

  //TODO: Add animations
  //TODO: Remove default SearchQuery State, handle Queries for when SearchQuery input is empty
  // USE FRAMER MOTIONS
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Grid container className="App" justifyContent="center" flexDirection="column" alignItems="center" flexWrap="nowrap">

      <Hero />

      <Container style={{display: "inline-flex", justifyContent: "center", alignItems: "center"}}>
        {theme.palette.mode} mode
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Container>

      <form onSubmit={handleOnSubmit} style={{margin: "1em", display: "flex", justifyContent: "center"}}>
          <TextField color="primary" variant="outlined" label="Github Profile" type='text' onChange={handleQueryChange}/>
          <Button style={{minHeight: "55px", marginLeft: "10px"}} size="large" variant="contained" type='submit'>Search</Button>
      </form>

      {userExists ? <DisplayProfile profile={profile} /> : <Display404/>}

      {
      repos != null ? 
      <DisplayRepos repos={repos}/> :
      ""
      }
      
      <Footer />
    </Grid>
  );
}


function ToggleColorMode() {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default ToggleColorMode;
