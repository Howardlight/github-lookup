import {Avatar, Box, Card, CardActionArea, Container, Typography} from "@mui/material"
import styles from "./RepoCard.module.css";

import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';

import {filterRepoData, useRepo} from "./Utils";
import React from "react";
import {Repository} from "../types";

export default function DisplayRepos({profileName}: { profileName: string }) {
    const {repos, isLoading, isError} = useRepo(profileName);


    if (isLoading) return <></>;
    if (isError) return <></>;

    // Filters through repositories by Stargazers then picks the top4
    let top4 = filterRepoData(repos).slice(-4);
    top4 = top4.reverse();

  return <>{ top4.map(repo => {return RepoCard(repo)}) }</>;
}



function RepoCard(repo: Repository) {
    const date = new Date(repo.created_at);
    return (
        <Card className={styles.card} sx={{m: 2}}>
            <CardActionArea key={repo.id} href={repo.html_url} style={{display: "flex", padding: "10xp",}} target="_blank">
                <Container>
                    <Typography variant="h6">{repo.name}</Typography>
                    <Typography className={styles.profileTextInfo}>Open Issues: {repo.open_issues}</Typography>
                    <Typography className={styles.profileTextInfo}>Is
                        Licenced: {repo["license"] ? repo["license"].name : "False"}</Typography>
                    <Typography className={styles.profileTextInfo}>Created at: {date.toDateString()}</Typography>
                    <Typography className={styles.profileTextInfo}>Language used: {repo.language}</Typography>

                    <Box className={styles.secondaryContainer} sx={{mt: 1, mb: 1}}>
                        <Typography className={styles.iconStats}><StarIcon/>{repo.stargazers_count}</Typography>
                        <Typography className={styles.iconStats}><ForkRightIcon/>{repo.forks}</Typography>
                    </Box>

                </Container>
                <Avatar variant="rounded" alt={"Repository IMG"}
                        sx={{width: 128, height: 128, m: 2}}>{repo.name[0]}</Avatar>
            </CardActionArea>
        </Card>
    );
  }
