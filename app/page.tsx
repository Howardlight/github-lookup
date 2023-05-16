"use client";
import React, { SyntheticEvent, createContext, useEffect, useState } from "react";
import { SearchBox } from "../components/SearchBox";
import Footer from "../components/Footer";
import Image from "next/image";
import GithubSVG from "./../public/github.svg";

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

export default function Home() {
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
    <div>
      <div className="flex-col justify-center items-center h-full">

        <div className="flex flex-row ml-5 mr-5 mt-5 font-semibold gap-2">
          <Image
            src={GithubSVG}
            alt="Github logo"
            color="black"
          />
          <h2>Github Profiles</h2>
        </div>

        {/* <Hero /> */}

        {/* <ThemeButton colorMode={colorMode} theme={theme} /> */}
        <SearchBox displayError={displayError} setDisplayError={setDisplayError} handleOnSubmit={handleOnSubmit} />

        {/* <DisplayProfile profileName={searchQuery} />
            <DisplayRepos profileName={searchQuery} /> */}
        {/* <Footer /> */}
      </div>
      {/* <div className="flex flex-row gap-1 justify-center pt-5 font-thin">
                <h5>Created by</h5>
                <a href="https://github.com/Howardlight">HowardLight</a>
                <h5>, 2022</h5>
            </div> */}
    </div>
  );
}

function onQueryChange(query: string) {
  useEffect(() => {

  }, [query])
}