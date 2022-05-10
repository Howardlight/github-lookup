import { Typography } from "@mui/material";
import React from "react";

export default function Footer() {
    return(
      <Typography variant="body2" color="text.secondary" style={{paddingTop: "5vh"}} align="center">
        Created by <a href="https://github.com/Howardlight" style={{textDecoration: "none"}}>HowardLight</a>, 2022
      </Typography>
    );
}