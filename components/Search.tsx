"use client";
import { useQueryStore } from "@/zustand/QueryStore";
import React, { useState } from "react";

export function Search() {
    const [query, setQuery] = useState("");
    const setQueryStore = useQueryStore((state) => state.setTo);

    function onClick() {
        setQueryStore(query);
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
    }

    return (
        <div className="mt-10 pb-8 ml-5 mr-5 text-base flex flex-row justify-center gap-2">
            <input onChange={onChange} value={query} className="border p-2 w-full rounded-sm dark:border-gray-800 dark:border-2 dark:text-black shadow-sm focus:outline-none" type="text" id="search-query" placeholder="Google" name="Search" />
            <button onClick={onClick} className="border border-gray-200 shadow-sm p-2 transition dark:border-white dark:border-2 dark:hover:text-black hover:bg-gray-100 rounded-sm">Search</button>
        </div>
    );
}