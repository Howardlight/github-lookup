import {Alert, Box, Button, Collapse, TextField} from "@mui/material";

export function SearchBox({displayError, setDisplayError, handleOnSubmit}) {
    return (
        <Box component={"div"} style={{paddingBottom: "30px"}}>
            <form onSubmit={handleOnSubmit} style={{margin: "1em", display: "flex", justifyContent: "center"}}>
                <TextField color="primary" variant="outlined" label="Github Profile" type='text'/>
                <Button style={{minHeight: "55px", marginLeft: "10px"}} size="large" variant="contained"
                        type='submit'>Search</Button>
            </form>
            <Collapse in={displayError}>
                <Alert onClose={() => setDisplayError(false)} severity="error">Search Field cannot
                    be <strong>Empty</strong>!</Alert>
            </Collapse>
        </Box>
    );
}