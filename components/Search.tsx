"use client";
import { useQueryStore } from "@/zustand/QueryStore";
import React, { useEffect, useState } from "react";
import { getProfileData } from "./Utils";
import { useProfileStore } from "@/zustand/ProfileStore";

export function Search() {
    const [query, setQuery] = useState("");
    const setQueryStore = useQueryStore((state) => state.setTo);

    function onClick() {
        setQueryStore(query);
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
    }

    useOnQueryChange();

    return (
        <div className="mt-10 pb-8 ml-5 mr-5 text-base flex flex-row justify-center gap-2">
            <input onChange={onChange} value={query} className="border p-2 w-full rounded-sm dark:border-gray-100 dark:border-2 dark:text-black shadow-sm focus:outline-none" type="text" id="search-query" placeholder="Google" name="Search" />
            <button onClick={onClick} className="border border-gray-200 shadow-sm p-2 transition dark:border-white dark:border-0 dark:bg-dark-mode-gray dark:hover:bg-dark-mode-gray/50 dark:hover:text-white hover:bg-gray-100 rounded-sm">Search</button>
        </div>
    );
}

//TODO: Very weird pattern
// Improve this
//TODO: Move this to its own component (separation of concern)
function useOnQueryChange() {
    const query = useQueryStore((state) => state.query);
    useEffect(() => {
        (async () => {
            const setProfile = useProfileStore.getState().setTo;
            if (query.trim() == "") {
                setProfile(undefined);
                return;
            }

            const profileData = await getProfileData(query);
            console.log(`[useOnQueryChange] data: `, profileData);

            setProfile(profileData);
        })()
    }, [query]);
}