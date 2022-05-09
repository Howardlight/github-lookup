// React
import {createContext, useContext, useMemo, useState, Fragment, Suspense} from 'react';
import './App.css';

//Material UI
import {
    Alert,
    Box,
    Button,
    Collapse,
    Container,
    createTheme,
    CssBaseline,
    IconButton,
    TextField,
    ThemeProvider,
    useTheme,
} from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Components
import RepoCard from "./components/RepoCard";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import {DisplayProfile} from './components/DisplayProfile';
import {useRepo} from './components/Utils';
import {filterRepoData} from './components/Utils';

export const ColorModeContext = createContext({
    toggleColorMode: () => {
    }
});

function App() {

    const [searchQuery, setSearchQuery] = useState("google");
    const [displayError, setDisplayError] = useState(false);    

    // CAUTION: THIS COMPONENT REFRESHES EACH TIME SEARCH HAS INPUT
    const DisplayRepos = ({profileName}) => {
        const { repos, isLoading, isError } = useRepo(profileName, true);


        if(isLoading) return "";
        if(isError) return "";

        // Filters through repositories by Stargazers then picks the top4
        let top4 = filterRepoData(repos).slice(-4);
        top4 = top4.reverse();

        return (
            <Fragment>
                {
                    top4.map(repo => {return RepoCard(repo)})
                }
            </Fragment>
        );
    }

    // FORM FUNCTIONS
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        let input = event.target[0].value;

        // Handle Empty input
        if(input === "") {
            setDisplayError(true);
            return ;
        }
        
        setSearchQuery(input);
    }

    //TODO: Add animations
    // USE FRAMER MOTIONS
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return (
        <Box style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

            <Hero />

            <Container style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                {theme.palette.mode} mode
                <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Container>

            <Box component={"div"} style={{ paddingBottom: "30px" }}>
                <form onSubmit={handleOnSubmit} style={{ margin: "1em", display: "flex", justifyContent: "center" }}>
                    <TextField color="primary" variant="outlined" label="Github Profile" type='text'/>
                    <Button style={{ minHeight: "55px", marginLeft: "10px" }} size="large" variant="contained"
                        type='submit'>Search</Button>
                </form>
                <Collapse in={displayError}>
                    <Alert onClose={() => setDisplayError(false)} severity="error">Search Field cannot be <strong>Empty</strong>!</Alert>
                </Collapse>
            </Box>


            <DisplayProfile profileName={searchQuery} />
            <DisplayRepos profileName={searchQuery} />

            <Footer />
        </Box>
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
