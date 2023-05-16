"use client";
import React, { Fragment } from "react";
import { fetcher } from "./Utils";
import { useQueryStore } from "@/zustand/QueryStore";
import useSWR, { SWRResponse } from "swr";
import { AxiosError } from "axios";
import { GithubProfile } from "@/types";



export function Profile() {
    const query = useQueryStore((state) => state.query);

    if (query.trim() !== "") return <ProfileComponent query={query} />;
    return <Fragment />;
}

function ProfileComponent({ query }: { query: string }) {
    const { data, error }: SWRResponse<GithubProfile | undefined, AxiosError> = useSWR(`https://api.github.com/users/${query}`, fetcher, { shouldRetryOnError: false });


    if (!data && !error) return <p>Loading...</p>;
    if (error || data == undefined) return <p>Error Occured</p>
    const date = new Date(data.created_at);
    return (
        <div>
            <p>Profile Name: {data.login}</p>
            <p>User Name: {data.name}</p>
            <p>Created at: {data.created_at === undefined ? "" : date.toDateString()}</p>
            <p>Follower: {data.followers}</p>
            <p>Public Repository Count: {data.public_repos}</p>
        </div>
    )
}