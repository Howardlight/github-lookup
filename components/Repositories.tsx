"use client";
import { Repository } from "@/types";
import { useProfileStore } from "@/zustand/ProfileStore";
import React, { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { fetcher } from "./Utils";
import useSWR, { SWRResponse } from "swr";
import Link from "next/link";
import { IconStar, IconGitFork, IconEye, IconAlertTriangle, IconMessageQuestion } from "@tabler/icons-react";
import SVGStyles from "../styles/SVG.module.css";


export default function Repositories() {
    const [pageIndex, setPageIndex] = useState(1);
    const profile = useProfileStore((state) => state.profile);
    const [showController, setShowController] = useState(false);

    useEffect(() => {
        setPageIndex(1);
    }, [profile])

    //TODO: Maybe add options for sorting
    //TODO: Maybe add the ability to see the README?

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
    const { data, error }: SWRResponse<Repository[], Error> = useSWR(`api/repositories/${profileLogin}/${pageIndex}`, fetcher, { shouldRetryOnError: false, revalidateOnFocus: false, revalidateOnReconnect: false });

    useEffect(() => {

        if ((!data && !error) || error || (data && data.length < 1)) setShowController(false);
        else setShowController(true);


        // If componenent unrenders, remove the controllers
        return () => setShowController(false);
    }, [data, error, setShowController])

    if (!data && !error) return <div className="flex flex-col gap-2 ml-5 mr-5 pb-5 mt-5">{Array.from({ length: 8 }, (_, i) => <Loading key={i} />)}</div>;
    if (error) return <Error />;
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

function Loading() {
    return (
        <div className="rounded-sm shadow-sm w-auto h-[138px] p-2">
            <div className="animate-pulse rounded-md h-6 w-14 bg-gray-200 dark:bg-dark-mode-white/60"></div>
            <div className="animate-pulse mt-2 mb-8 rounded-md h-6 w-auto bg-gray-200 dark:bg-dark-mode-white/80"></div>
            <div className="flex flex-row justify-between">
                <div className="animate-pulse rounded-md shadow-sm w-12 h-[34px] bg-gray-200 dark:bg-dark-mode-white/80"></div>
                <div className="flex flex-row gap-3">
                    <div className="animate-pulse rounded-md w-9 h-[34px] bg-gray-200 dark:bg-dark-mode-white/80"></div>
                    <div className="animate-pulse rounded-md w-9 h-[34px] bg-gray-200 dark:bg-dark-mode-white/80"></div>
                    <div className="animate-pulse rounded-md w-9 h-[34px] bg-gray-200 dark:bg-dark-mode-white/80"></div>
                </div>
            </div>
        </div>
    )
}

function Error() {
    return (
        <div className="flex flex-col justify-center items-center rounded-sm w-auto h-32 mt-5">
            <IconAlertTriangle color="#ef4444" width={128} height={128} />
            <div className="flex flex-col items-center">
                <p className="text-red-500 font-semibold">An Error occured</p>
                <p className="text-red-500 text-sm">Please check the console.</p>
            </div>
        </div>
    )
}

function PageController({ pageIndex, setPageIndex, publicRepoNumber, showController }: { pageIndex: number, setPageIndex: Dispatch<SetStateAction<number>>, publicRepoNumber: number, showController: boolean }) {
    if (!showController) return <Fragment />;
    return (
        <div className="flex flex-row items-center justify-center gap-4 pb-5">
            <button disabled={pageIndex == 1 ? true : false} className="border border-gray-200 shadow-sm p-2 transition hover:bg-gray-100 dark:border-0 dark:font-semibold dark:bg-dark-mode-blue/80 dark:hover:bg-dark-mode-blue dark:hover:text-white dark:disabled:bg-dark-mode-gray/80 disabled:cursor-not-allowed rounded-sm w-32" onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
            <p className="border border-gray-200 dark:border-0 dark:bg-dark-mode-blue shadow-sm px-5 py-[6px] rounded-sm text-xl font-semibold">{pageIndex}</p>
            <button disabled={publicRepoNumber - (pageIndex * 30) <= 0 ? true : false} className="border border-gray-200 shadow-sm p-2 transition dark:border-0 dark:font-semibold dark:bg-dark-mode-blue dark:hover:bg-dark-mode-blue dark:hover:text-white dark:disabled:bg-dark-mode-gray/80 disabled:cursor-not-allowed hover:bg-gray-100 rounded-sm w-32" onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
        </div>
    )
}

function RepositoryCard({ data }: { data: Repository }) {
    return (
        <div className="rounded-sm dark:bg-dark-mode-black/10 shadow-sm p-2">
            <p className="font-semibold dark:text-dark-mode-white/80">{data.name}</p>
            <div className="mt-2 mb-8 dark:text-dark-mode-white/80">{data.description ? data.description : <NoDescription />}</div>
            <div className="flex flex-row justify-between">
                <Link href={data.html_url}>
                    <button className="border border-gray-200 hover:bg-gray-100 shadow-sm p-2 transition dark:border-0 dark:bg-dark-mode-gray dark:hover:text-white dark:hover:bg-dark-mode-gray/50 rounded-sm pt-1 pb-1 pr-2 pl-2">
                        Visit
                    </button>
                </Link>
                <div className="flex flex-row gap-3">
                    <div className="flex flex-row items-center gap-1">
                        <IconStar className={SVGStyles.standard} />
                        <p className="font-semibold dark:text-dark-mode-white/80">{data.stargazers_count}</p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <IconGitFork className={SVGStyles.standard} />
                        <p className="font-semibold dark:text-dark-mode-white/80">{data.forks_count}</p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <IconEye className={SVGStyles.standard} />
                        <p className="font-semibold dark:text-dark-mode-white/80">{data.watchers_count}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NoDescription() {
    return (
        <div className="flex flex-row items-center gap-2">
            <IconMessageQuestion className={SVGStyles.noDescription} />
            <p className="text-gray-500 dark:text-dark-mode-white/50">No Description</p>
        </div>
    )
}