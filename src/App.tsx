// React
import {createContext, SyntheticEvent, useContext, useMemo, useState,} from 'react';
import './App.css';

//Material UI
import {Box, createTheme, CssBaseline, PaletteMode, ThemeProvider, useTheme,} from "@mui/material";

// Components
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import DisplayProfile from './components/DisplayProfile';
import DisplayRepos from './components/DisplayRepo';
import {SearchBox} from "./components/SearchBox";
import {ThemeButton} from "./components/ThemeButton";
import React from 'react';

export const ColorModeContext = createContext({toggleColorMode: () => {}} );

//TODO: Port to Typescript
function App() {

    const [searchQuery, setSearchQuery] = useState<string>("google");
    const [displayError, setDisplayError] = useState<boolean>(false);

    // FORM FUNCTIONS
    const handleOnSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        // @ts-ignore
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

function ToggleColorMode() {
    const [mode, setMode] = useState<PaletteMode>('light');
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
