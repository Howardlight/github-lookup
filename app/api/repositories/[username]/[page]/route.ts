import { GithubProfile, Repository } from "@/types";
import axios from "axios";
import { NextResponse } from "next/server";
const baseUrl = "https://api.github.com/users/";

export async function GET(request: Request, { params }: { params: { username: string, page: string } }) {
    try {
        if (!params.username) throw `Provided username parameter is not valid! username: ${params.username}`;
        if (!params.page) throw `Provided page parameter is not valid! username: ${params.page}`;

        const req = await axios(`https://api.github.com/users/${params.username}/repos?page=${params.page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/vnd.github+json",
                "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`
            }
        })

        if (req.status !== 200) {
            console.error(`[getProfileData][ERROR] Req Status is not valid! status: ${req.status}`);
            return NextResponse.json(null);
        }

        const data: Repository[] = req.data;

        return NextResponse.json(data);
    } catch (e) {
        console.error(`[api][repositories][GET][ERROR] could not fetch repositories!\nError: `, e);
        return NextResponse.json(undefined);
    }
}