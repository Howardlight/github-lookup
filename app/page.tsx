import React from "react";
import { Search } from "../components/Search";
import Image from "next/image";
import GithubSVG from "./../public/github.svg";
import { Profile } from "@/components/Profile";
import Repositories from "@/components/Repositories";

export default function Home() {

  //TODO: Fix Rate Limiting
  //https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#rate-limiting

  //TODO: Switch to Tabler's line of npm icons


  return (
    <div>

      <div className="flex flex-row ml-5 mr-5 mt-5 font-semibold gap-2">
        <Image
          src={GithubSVG}
          alt="Github logo"
          color="black"
        />
        <h2>Github Lookup</h2>
      </div>

      <Search />

      <Profile />
      <Repositories />


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