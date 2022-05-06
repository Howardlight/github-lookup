import {Avatar, Container, Paper, Typography} from "@mui/material";
import styles from "./DisplayProfile.module.css";
import { Fragment } from "react";

export function DisplayProfile({profile}) {
  const date = new Date(profile.created_at);
    return (
        <Fragment>
                <Paper elevation={10} className={styles.paper}>
                    <Container className={styles.secondaryContainer}>
                        <Typography>Login Name: {profile.login}</Typography>
                        <Typography>Name: {profile.name}</Typography>
                        <Typography>Created
                            at: {profile.created_at === undefined ? "" : date.toDateString()}</Typography>
                        <Typography>Followers: {profile.followers}</Typography>
                        <Typography>Repo count: {profile.public_repos}</Typography>
                    </Container>
                    <Avatar src={profile.avatar_url} variant="rounded" alt={"Profile IMG"}
                            sx={{width: 128, height: 128}}/>
                </Paper>
        </Fragment>
    );
}