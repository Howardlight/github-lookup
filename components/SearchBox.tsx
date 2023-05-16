import { Alert, Box, Button, Collapse, TextField } from "@mui/material";
import React, { Dispatch, FormEventHandler, SetStateAction } from "react";

export function SearchBox({ displayError, setDisplayError, handleOnSubmit }: { displayError: boolean, setDisplayError: Dispatch<SetStateAction<boolean>>, handleOnSubmit: FormEventHandler<HTMLFormElement> }) {
    return (
        <div className="mt-10 pb-8 ml-5 mr-5 text-base flex flex-row justify-center gap-2">
            <input className="border p-2 w-full shadow-sm" type="text" id="search-query" placeholder="Google" name="Search" />
            <button className="shadow-sm p-2 transition hover:bg-gray-100 rounded-sm">Search</button>
        </div>
    );
}