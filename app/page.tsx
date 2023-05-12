"use client";
import { Box, useTheme } from "@mui/material";
import React, { SyntheticEvent, createContext, useContext, useState } from "react";
import Hero from "../components/Hero";
import DisplayProfile from "../components/DisplayProfile";
import { SearchBox } from "../components/SearchBox";
import { ThemeButton } from "../components/ThemeButton";
import DisplayRepos from "../components/DisplayRepo";
import Footer from "../components/Footer";
import "../styles/App.css";

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

export default function Page() {
    const [searchQuery, setSearchQuery] = useState<string>("google");
    const [displayError, setDisplayError] = useState<boolean>(false);

    // FORM FUNCTIONS
    const handleOnSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        // @ts-ignore
        let input = event.target[0].value;

        // Handle Empty input
        if (input === "") {
            setDisplayError(true);
            return;
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