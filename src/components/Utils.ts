import axios from "axios";
import useSWR from "swr";
import {Repository} from "../types";
const fetcher = (url: string) => axios.get(url).then(res => res.data);

export async function getProfileData(key: string) {
    const baseUrl = "https://api.github.com/users/";
    var output = null;
    await axios(`${baseUrl}${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => output = response.data)
    .catch(err => {console.log(err)})
    return output;
}

export function useProfile(profileName: string) {
  const { data, error } = useSWR(`https://api.github.com/users/${profileName}`, fetcher);

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useRepo(profileName: string) {
  const { data, error } = useSWR(`https://api.github.com/users/${profileName}/repos`, fetcher);

  return {
    repos: data,
    isLoading: !error && !data,
    isError: error
  }
}

export async function getRepoData(key: string) {
    const baseUrl = "https://api.github.com/users/";
    var output = null;
    await axios(`${baseUrl}${key}/repos`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json"
        }
    })
    .then(response => {
        output = filterRepoData(response.data);
    })
    .catch(err => {console.log(err);})
    return output;
}


// Sorts Array  by stargazers_count ascending
export function filterRepoData(obj: Repository[]) {
    // const duplicateElement = toFindDuplicates(obj);
    // console.log(duplicateElement);
    let temp = null;
    for(let i = 0; i < obj.length; i++){
      for(let j = i+1; j < obj.length; j++){
        if(obj[j].stargazers_count < obj[i].stargazers_count){
          temp = obj[i];
          obj[i] = obj[j];
          obj[j] = temp;
        }
      }
    }
    return obj;
}

// CAN BE USED FOR LATER
// function toFindDuplicates(arry) {
//   const uniqueElements = new Set(arry);
//   const filteredElements = arry.filter(item => {
//       if (uniqueElements.has(item.id)) {
//           uniqueElements.delete(item);
//       } else {
//           return item;
//       }
//   });

//   return [...new Set(uniqueElements)]
// }