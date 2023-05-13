"use client";
import { Box, useTheme } from "@mui/material";
import React, { SyntheticEvent, createContext, useContext, useEffect, useState } from "react";
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


    onQueryChange(searchQuery);

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

    return (
        <div className="flex-col justify-center items-center">

            {/* <Hero /> */}

            {/* <ThemeButton colorMode={colorMode} theme={theme} /> */}

            <SearchBox displayError={displayError} setDisplayError={setDisplayError} handleOnSubmit={handleOnSubmit} />

            {/* <DisplayProfile profileName={searchQuery} />
            <DisplayRepos profileName={searchQuery} /> */}
            <Footer />
        </div>
    );
}

function onQueryChange(query: string) {
    useEffect(() => {

    }, [query])
}