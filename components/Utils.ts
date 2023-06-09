import axios, { AxiosError } from "axios";
import useSWR, { SWRResponse } from "swr";
import { GithubProfile, Repository } from "../types";
export const fetcher = (url: string) => axios.get(url).then(res => res.data);

export async function getProfileData(key: string): Promise<GithubProfile | undefined | null> {
  try {
    const baseUrl = "https://api.github.com/users/";
    if (key === "") return undefined;

    const req = await axios(`${baseUrl}${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.github+json"
      }
    })

    if (req.status != 200) {
      console.error(`[getProfileData][ERROR] Req Status is not valid! status: ${req.status}`);
      return null;
    }

    const data: GithubProfile = req.data;

    return data;
  } catch (e) {
    console.error(`[getProfileData][ERROR] Could not fetch profile data!\nError: `, e);
    return null;
  }
}

export function useProfile(profileName: string) {
  const { data, error }: SWRResponse<any, AxiosError> = useSWR(`https://api.github.com/users/${profileName}`, fetcher, {
    // onErrorRetry: (error, key, config, revalidate, {retryCount}) => {

    //   // Stops retrying if error is 404
    //   if (error.response!.status === 404) return

    // },
    shouldRetryOnError: false
  });

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useRepo(profileName: string) {
  const { data, error }: SWRResponse<any, AxiosError> = useSWR(`https://api.github.com/users/${profileName}/repos`, fetcher, {
    // onErrorRetry: (error, key, config, revalidate, {retryCount}) => {

    //   // Stops retrying if error is 404
    //   if (error.response!.status === 404) return

    // },
    shouldRetryOnError: false
  });

  return {
    repos: data,
    isLoading: !error && !data,
    isError: error
  }
}

export async function getRepoData(profileName: string) {
  const baseUrl = "https://api.github.com/users/";

  if (profileName.trim() === "") return undefined;

  const req = await axios(`${baseUrl}${profileName}/repos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/vnd.github+json"
    }
  })

  if (req.status != 200) {
    console.error(`[getRepoData][ERROR] Req Status is not valid! status: ${req.status} \n${req.statusText}`);
    return undefined;
  }

  const data = req.data;

  return data;
}

export function sortReposByStar(repos: Repository[]) {
  const output = [...repos];

  return output.sort((repo1, repo2) => repo1.stargazers_count < repo2.stargazers_count ? 1 : -1);
}