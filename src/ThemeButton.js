import {Container, IconButton} from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

export function ThemeButton({colorMode, theme}) {
    return (
        <Container style={{display: "inline-flex", justifyContent: "center", alignItems: "center"}}>
            {theme.palette.mode} mode
            <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
            </IconButton>
        </Container>
    );
}