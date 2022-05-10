// React
import {createContext, useContext, useMemo, useState,} from 'react';
import './App.css';

//Material UI
import {Box, Container, createTheme, CssBaseline, IconButton, ThemeProvider, useTheme,} from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Components
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import DisplayProfile from './components/DisplayProfile';
import DisplayRepos from './components/DisplayRepo';
import {SearchBox} from "./components/SearchBox";

export const ColorModeContext = createContext({
    toggleColorMode: () => {
    }
});

//TODO: Port to Typescript
function App() {

    const [searchQuery, setSearchQuery] = useState("google");
    const [displayError, setDisplayError] = useState(false);    

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

            <ThemeButton colorMode={colorMode} theme={theme} />

            <SearchBox displayError={displayError} setDisplayError={setDisplayError} handleOnSubmit={handleOnSubmit} />

            <DisplayProfile profileName={searchQuery} />
            <DisplayRepos profileName={searchQuery} />

            <Footer />
        </Box>
    );
}

function ThemeButton({colorMode, theme}) {
    return (
        <Container style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
            {theme.palette.mode} mode
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Container>
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
