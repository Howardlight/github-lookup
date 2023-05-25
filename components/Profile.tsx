"use client";
import React, { Fragment } from "react";
import { fetcher } from "./Utils";
import { useQueryStore } from "@/zustand/QueryStore";
import useSWR, { SWRResponse } from "swr";
import { AxiosError } from "axios";
import { GithubProfile } from "@/types";
import Image from "next/image";


export function Profile() {
    const query = useQueryStore((state) => state.query);

    if (query.trim() !== "") return <ProfileComponent query={query} />;
    return <Fragment />;
}

function ProfileComponent({ query }: { query: string }) {
    const { data, error }: SWRResponse<GithubProfile | undefined, AxiosError> = useSWR(`https://api.github.com/users/${query}`, fetcher, { shouldRetryOnError: false });

    //TODO: Create a Bio Area
    //TODO: Add More Properties
    //TODO: Add Better Loading

    if (!data && !error) return <p>Loading...</p>;
    if (error || data == undefined) return <p>Error Occured</p>
    const date = new Date(data.created_at);
    return (
        <div className="flex flex-row gap-2 shadow-md ml-5 mr-5 pl-2 pr-2 pt-2 pb-2">
            <Image
                src={data.avatar_url}
                alt={"Avatar Image"}
                width={125}
                height={125}
                className="rounded-md shadow-sm"
            />
            <div>
                <p className="text-xl font-bold">{data.name ? data.name : data.login}</p>
                <p className="text-sm">Created at: {data.created_at === undefined ? "" : date.toDateString()}</p>
                <p className="text-sm">Follower: {data.followers}</p>
                <p className="text-sm">Public Repo Count: {data.public_repos}</p>
            </div>
        </div>
    )
}