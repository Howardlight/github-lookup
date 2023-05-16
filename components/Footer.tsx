import { Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-row gap-1 justify-center pt-5 font-thin">
      <h5>Created by</h5>
      <a href="https://github.com/Howardlight">HowardLight</a>
      <h5>, 2022</h5>
    </div>
  );
}