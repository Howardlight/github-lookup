import React from "react";
import { Search } from "../components/Search";
import { IconBrandGithubFilled } from "@tabler/icons-react";
import { Profile } from "@/components/Profile";
import Repositories from "@/components/Repositories";
import SVGStyles from "../styles/SVG.module.css";

export default function Home() {
  return (
    <div>

      <div className="flex flex-row ml-5 mr-5 mt-5 font-semibold gap-2">
        <IconBrandGithubFilled className={SVGStyles.standard} />
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