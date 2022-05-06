// React
import {createContext, useContext, useMemo, useState,} from 'react';
import './App.css';

//Material UI
import {
    Alert,
    Button, Collapse,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    IconButton,
    TextField,
    ThemeProvider,
    useTheme,
    Box
} from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Components
import RepoCard from "./components/RepoCard";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Display404 from './components/Display404';
import {DisplayProfile} from './components/DisplayProfile';
import {getProfileData, getRepoData} from './components/Utils';

export const ColorModeContext = createContext({
    toggleColorMode: () => {
    }
});

function App() {

    const [profile, setProfile] = useState("null");
    const [searchQuery, setSearchQuery] = useState("");
    const [userExists, setUserExists] = useState(true);
    const [repos, setRepos] = useState(null);
    const [displayError, setDisplayError] = useState(false);

    // CAUTION: THIS COMPONENT REFRESHES EACH TIME SEARCH HAS INPUT
    const DisplayRepos = ({repos}) => {
        let top4 = repos.slice(-4);
        top4 = top4.reverse();
        // console.log(top4);

        return (<div> {top4.map(repo => {
            return RepoCard(repo)
        })}</div>);
    }

    // FORM FUNCTIONS
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        let input = event.target[0].value;

        // Handle Empty input
        if(input === "") {
            console.log("detected empty string input");
            setDisplayError(true);
            return ;
        }

        // check if user exists
        const profile = await getProfileData(searchQuery);
        if (profile != null) { // if object exists
            setUserExists(true);
            setProfile(profile);
        } else {
            setUserExists(false);
            setRepos(null);
        }

        if (profile != null) {
            const repositories = await getRepoData(searchQuery);
            if (repositories != null) { // if repositories exist
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
        <Grid container className="App" justifyContent="center" flexDirection="column" alignItems="center"
              flexWrap="nowrap">

            <Hero/>

            <Container style={{display: "inline-flex", justifyContent: "center", alignItems: "center"}}>
                {theme.palette.mode} mode
                <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                </IconButton>
            </Container>

            <Box component={"div"}>
                <form onSubmit={handleOnSubmit} style={{margin: "1em", display: "flex", justifyContent: "center"}}>
                    <TextField color="primary" variant="outlined" label="Github Profile" type='text'
                               onChange={handleQueryChange}/>
                    <Button style={{minHeight: "55px", marginLeft: "10px"}} size="large" variant="contained"
                            type='submit'>Search</Button>
                </form>
                <Collapse in={displayError}>
                    <Alert onClose={() => setDisplayError(false)} severity="error">Search Field cannot be <strong>Empty</strong>!</Alert>
                </Collapse>
            </Box>


            {userExists ? <DisplayProfile profile={profile}/> : <Display404/>}

            {
                repos != null ?
                    <DisplayRepos repos={repos}/> :
                    ""
            }

            <Footer/>
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
                <CssBaseline/>
                <App/>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}


export default ToggleColorMode;
