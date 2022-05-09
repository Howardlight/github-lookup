import {
    Typography,
    Card,
    CardActionArea,
    Container,
    Avatar
} from "@mui/material"
import styles from "./RepoCard.module.css";

import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';

import {useRepo, filterRepoData} from "./Utils";

export default function DisplayRepos({profileName}) {
  const { repos, isLoading, isError } = useRepo(profileName, true);


  if(isLoading) return "";
  if(isError) return "";

  // Filters through repositories by Stargazers then picks the top4
  let top4 = filterRepoData(repos).slice(-4);
  top4 = top4.reverse();

  return top4.map(repo => {return RepoCard(repo)})
}



function RepoCard(repo) {
    const date = new Date(repo.created_at);
    return(
      <CardActionArea key={repo.id} href={repo.html_url} target="_blank">
        <Card className={styles.card}>
          <Container className={styles.mainContainer}>
            <Typography variant="h6">{repo.name}</Typography>
            <Typography className={styles.profileTextInfo}>Open Issues: {repo.open_issues}</Typography>
            <Typography className={styles.profileTextInfo}>Is Licenced: {repo["license"] ? repo["license"].name : "False"}</Typography>
            <Typography className={styles.profileTextInfo}>Created at: {date.toDateString()}</Typography>
            <Typography className={styles.profileTextInfo}>Language used: {repo.language}</Typography>

            <Container className={styles.secondaryContainer}>
              <Typography className={styles.iconStats}><StarIcon />{repo.stargazers_count}</Typography>
              <Typography className={styles.iconStats}><ForkRightIcon />{repo.forks}</Typography>
            </Container>
          </Container>
          <Avatar variant="rounded" alt={"Profile IMG"} sx={{ width: 128, height: 128}}>{repo.name[0]}</Avatar>
        </Card>
      </CardActionArea>
    );
  }
