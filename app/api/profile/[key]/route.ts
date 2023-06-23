import { GithubProfile } from "@/types";
import axios from "axios";
import { NextResponse } from "next/server";
const baseUrl = "https://api.github.com/users/";

export async function GET(request: Request, { params }: { params: { key: string } }) {
    try {
        if (!params.key) throw `Provided Key parameter is not valid! Key: ${params.key}`;

        const req = await axios(`${baseUrl}${params.key}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/vnd.github+json",
                "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`
            }
        })

        if (req.status != 200) {
            console.error(`[getProfileData][ERROR] Req Status is not valid! status: ${req.status}`);
            return NextResponse.json(null);
        }

        const data: GithubProfile = req.data;

        return NextResponse.json(data);
    } catch (e) {
        console.error(`[api][profile][GET][ERROR] could not fetch profile!\nError: `, e);
        return NextResponse.json(undefined);
    }
}