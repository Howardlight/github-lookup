import React, { createContext } from "react";
import { SearchBox } from "../components/SearchBox";
import Image from "next/image";
import GithubSVG from "./../public/github.svg";
import { Profile } from "@/components/DisplayProfile";

export default function Home() {

  return (
    <div>

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
      <SearchBox />

      <Profile />
      {/* <DisplayProfile profileName={searchQuery} />
            <DisplayRepos profileName={searchQuery} /> */}

      {/* <div className="w-[100vw] left-0 bottom-0">
        <div className="justify-self-end flex flex-row gap-1 justify-center pt-5 font-thin">
          <h5>Created by</h5>
          <a href="https://github.com/Howardlight">HowardLight</a>
          <h5>, 2022</h5>
        </div>
      </div> */}

    </div>
  );
}