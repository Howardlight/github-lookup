"use client";
import { Repository } from "@/types";
import { useProfileStore } from "@/zustand/ProfileStore";
import React, { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from "react";
import { fetcher } from "./Utils";
import useSWR, { SWRResponse } from "swr";
import Image from "next/image";

import StarSVG from "@/public/star.svg";
import Fork from "@/public/git-fork.svg";
import Eye from "@/public/eye.svg";
import Link from "next/link";

export default function Repositories() {
    const [pageIndex, setPageIndex] = useState(1);
    const profile = useProfileStore((state) => state.profile);
    const [showController, setShowController] = useState(false);

    useEffect(() => {
        setPageIndex(1);
    }, [profile])

    //TODO: Maybe add options for sorting
    //TODO: Add Icons for stuff like Forks and StarGazers
    //TODO: Maybe add the ability to see the README?

    //TODO: Handle case when user reaches end of Repositories
    if (profile == undefined) return <Fragment />;
    else if (profile == null) return <p>Error Occured</p>;
    return (
        <div>
            <RepositoryComponent profileLogin={profile.login} pageIndex={pageIndex} setShowController={setShowController} />
            <PageController pageIndex={pageIndex} setPageIndex={setPageIndex} publicRepoNumber={profile.public_repos} showController={showController} />
        </div>
    )
}


function RepositoryComponent({ profileLogin, pageIndex, setShowController }: { profileLogin: string, pageIndex: number, setShowController: Dispatch<SetStateAction<boolean>> }) {
    const { data, error }: SWRResponse<Repository[], Error> = useSWR(`https://api.github.com/users/${profileLogin}/repos?page=${pageIndex}`, fetcher, { shouldRetryOnError: false });


    //TODO: Add Skeleton
    //TODO: Add Error Component

    useEffect(() => {

        if ((!data && !error) || error || (data && data.length < 1)) setShowController(false);
        else setShowController(true);


        // If componenent unrenders, remove the controllers
        return () => setShowController(false);
    }, [data, error, setShowController])

    if (!data && !error) return <p>Loading...</p>;
    if (error) return <p>Error Occured</p>;
    return (
        <div className="flex flex-col gap-2 ml-5 mr-5 pb-5 mt-5">
            {data && data.length > 0 ?
                data!.map((repo) => <RepositoryCard data={repo} key={repo.id} />)
                : <NoRepos />}
        </div>
    )
}


function NoRepos() {
    return (
        <div className="flex justify-center m-5">
            <p className="font-semibold">No Repositories found</p>
        </div>
    );
}

function PageController({ pageIndex, setPageIndex, publicRepoNumber, showController }: { pageIndex: number, setPageIndex: Dispatch<SetStateAction<number>>, publicRepoNumber: number, showController: boolean }) {
    //TODO: Improve Styling

    if (!showController) return <Fragment />;
    return (
        <div className="flex flex-row items-center justify-center gap-4 pb-5">
            <button disabled={pageIndex == 1 ? true : false} className="border border-gray-200 shadow-sm p-2 transition dark:border-white dark:border-2 dark:hover:text-black hover:bg-gray-100 rounded-sm w-32" onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
            <p className="border border-gray-200 shadow-sm p-2 px-4 text-xl font-semibold">{pageIndex}</p>
            <button disabled={publicRepoNumber - (pageIndex * 30) <= 0 ? true : false} className="border border-gray-200 shadow-sm p-2 transition dark:border-white dark:border-2 dark:hover:text-black hover:bg-gray-100 rounded-sm w-32" onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
        </div>
    )
}

function RepositoryCard({ data }: { data: Repository }) {
    //TODO: Overhaul
    return (
        <div className="rounded-sm shadow-sm p-2">
            <p className="font-semibold">{data.name}</p>
            <p className="mt-2 mb-8">{data.description ? data.description : "No Description"}</p>
            <div className="flex flex-row justify-between">
                <div>
                    <Link href={data.html_url}>
                        <button className="border border-gray-200 shadow-sm p-2 transition dark:border-white dark:border-2 dark:hover:text-black hover:bg-gray-100 rounded-sm pt-1 pb-1 pr-2 pl-2">
                            Visit
                        </button>
                    </Link>
                </div>
                <div className="flex flex-row gap-3">
                    <div className="flex flex-row items-center gap-1">
                        <Image
                            src={StarSVG}
                            alt="Star"
                            color="black"
                        />
                        <p className="font-semibold">{data.stargazers_count}</p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <Image
                            src={Fork}
                            alt="Forks"
                            color="black"
                        />
                        <p className="font-semibold">{data.forks_count}</p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <Image
                            src={Eye}
                            alt="Watchers"
                            color="black"
                        />
                        <p className="font-semibold">{data.watchers_count}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}