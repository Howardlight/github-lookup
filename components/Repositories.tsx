"use client";
import { Repository } from "@/types";
import { useProfileStore } from "@/zustand/ProfileStore";
import React, { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { fetcher } from "./Utils";
import useSWR, { SWRResponse } from "swr";

export default function Repositories() {
    const [pageIndex, setPageIndex] = useState(1);
    const profile = useProfileStore((state) => state.profile);


    useEffect(() => {
        setPageIndex(1);
    }, [profile])

    //TODO: Maybe add options for sorting
    //TODO: Add Icons for stuff like Forks and StarGazers
    //TODO: Maybe add the ability to see the README?

    //TODO: Handle case when no Repos are found
    //TODO: Handle case when user reaches end of Repositories
    if (profile == undefined) return <Fragment />;
    else if (profile == null) return <p>Error Occured</p>;
    return (
        <div>
            <RepositoryComponent profileLogin={profile.login} pageIndex={pageIndex} />
            <PageController pageIndex={pageIndex} setPageIndex={setPageIndex} />
        </div>
    )
}


function RepositoryComponent({ profileLogin, pageIndex }: { profileLogin: string, pageIndex: number }) {
    const { data, error }: SWRResponse<Repository[], Error> = useSWR(`https://api.github.com/users/${profileLogin}/repos?page=${pageIndex}`, fetcher);


    //TODO: Add Skeleton
    //TODO: Add Error Component

    if (!data && !error) return <p>Loading...</p>;
    if (error) return <p>Error Occured</p>;
    return (
        <div className="flex flex-col gap-2 ml-5 mr-5 pb-5 mt-5">
            {data!.map((repo) => <RepositoryCard data={repo} key={repo.id} />)}
        </div>
    )
}

function PageController({ pageIndex, setPageIndex }: { pageIndex: number, setPageIndex: Dispatch<SetStateAction<number>> }) {
    //TODO: Improve Styling

    return (
        <div className="flex flex-row items-center justify-center gap-4 pb-5">
            <button disabled={pageIndex == 1 ? true : false} className="border border-gray-200 shadow-sm p-2 transition dark:border-white dark:border-2 dark:hover:text-black hover:bg-gray-100 rounded-sm" onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
            <p className="text-xl font-semibold">{pageIndex}</p>
            <button className="border border-gray-200 shadow-sm p-2 transition dark:border-white dark:border-2 dark:hover:text-black hover:bg-gray-100 rounded-sm" onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
        </div>
    )
}

function RepositoryCard({ data }: { data: Repository }) {
    //TODO: Overhaul
    return (
        <div className="rounded-sm shadow-sm p-2">
            <p className="font-semibold">{data.name}</p>
            <p>{data.stargazers_count}</p>
        </div>
    )
}