import {Avatar, CircularProgress, Container, Paper, Typography} from "@mui/material";
import styles from "./DisplayProfile.module.css";
import {Fragment} from "react";
import {useProfile} from "./Utils";
import React from "react";

export default function DisplayProfile({profileName}: {profileName: string}) {
    const { profile, isLoading, isError } = useProfile(profileName);

    if(isLoading) return <CircularProgress />
    if(isError) {
        
        if(isError.response?.status == 404) return (<>
            <Typography variant="h5" color="red">This Profile Does not exist!</Typography>
            <Typography variant="subtitle1">Please try another profile</Typography>
        </>)

        return (<div>Error Occurred</div>);
    }
    
    const date = new Date(profile.created_at);
    return (
        <Fragment>
                <Paper elevation={10} className={styles.paper}>
                    <Container className={styles.secondaryContainer}>
                        <Typography>Login Name: {profile.login}</Typography>
                        <Typography>Name: {profile.name}</Typography>
                        <Typography>Created
                            at: {profile.created_at === undefined ? "" : date.toDateString()}
                            </Typography>
                        <Typography>Followers: {profile.followers}</Typography>
                        <Typography>Repo count: {profile.public_repos}</Typography>
                    </Container>
                    <Avatar src={profile.avatar_url} variant="rounded" alt={"Profile IMG"}
                            sx={{width: 128, height: 128}}/>
                </Paper>
        </Fragment>
    );
}