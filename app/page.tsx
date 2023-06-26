import React from "react";
import { Search } from "../components/Search";
import { IconBrandGithubFilled } from "@tabler/icons-react";
import { Profile } from "@/components/Profile";
import Repositories from "@/components/Repositories";
import SVGStyles from "../styles/SVG.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Github Lookup",
  description: "Github Lookup allows you to search through any github account of your choice for information and all public Repositories associated with the account.",
  openGraph: {
    title: "Github Lookup",
    description: "Github Lookup allows you to search through any github account of your choice for information and all public Repositories associated with the account.",
    url: "https://github-lookup-release.vercel.app",
    siteName: "Github Lookup",
    locale: "en-US",
    type: "website"
  }
}

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

    </div>
  );
}