import {Container, IconButton, Theme} from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import React from "react";

//TODO: Type colorMode appropriately
export function ThemeButton({colorMode, theme}: {colorMode: any, theme: Theme}) {
    return (
        <Container style={{display: "inline-flex", justifyContent: "center", alignItems: "center"}}>
            {theme.palette.mode} mode
            <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
            </IconButton>
        </Container>
    );
}