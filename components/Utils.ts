import axios from "axios";
import { GithubProfile } from "../types";
export const fetcher = (url: string) => axios.get(url).then(res => res.data);

export async function getProfileData(key: string): Promise<GithubProfile | undefined | null> {
  try {
    if (key === "") return undefined;

    const data: { data: GithubProfile | undefined | null } = await axios(`api/profile/${key}`, {
      method: "GET",
    })

    return data.data;
  } catch (e) {
    console.error(`[getProfileData][ERROR] Could not fetch profile data!\nError: `, e);
    return null;
  }
}