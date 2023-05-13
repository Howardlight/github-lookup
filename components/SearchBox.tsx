import { Alert, Box, Button, Collapse, TextField } from "@mui/material";
import React, { Dispatch, FormEventHandler, SetStateAction } from "react";

export function SearchBox({ displayError, setDisplayError, handleOnSubmit }: { displayError: boolean, setDisplayError: Dispatch<SetStateAction<boolean>>, handleOnSubmit: FormEventHandler<HTMLFormElement> }) {
    return (
        <div className="pb-8 text-base flex flex-row justify-center gap-2">
            <input className="border p-2" type="text" id="search-query" placeholder="Google" name="Search" />
            <button className="shadow-md p-2 transition hover:bg-gray-200 rounded-md">Search</button>
        </div>
    );
}