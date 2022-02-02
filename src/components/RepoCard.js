import {
    Typography,
    Card,
    CardActionArea,
    Container,
    Avatar
} from "@mui/material"

import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';

export default function RepoCard(repo) {
    const date = new Date(repo.created_at);
    return(
      <CardActionArea key={repo.id} href={repo.html_url} target="_blank">
        <Card style={{padding: "30px", marginTop: "10px", marginBottom:"10px", display:"flex"}}>
          <Container style={{display: "flex", flexDirection: "column", justifyContent:"flex-start"}}>
            <Typography variant="h6">{repo.name}</Typography>
            <Typography style={{display: "flex", alignItems: "center"}}>Open Issues: {repo.open_issues}</Typography>
            <Typography style={{display: "flex", alignItems: "center"}}>Is Licenced: {repo["license"] ? repo["license"].name : "False"}</Typography>
            <Typography style={{display: "flex", alignItems: "center"}}>Created at: {date.toDateString()}</Typography>
            <Typography style={{display: "flex", alignItems: "center"}}>Language used: {repo.language}</Typography>

            <Container style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingLeft: "0px", marginTop: "30px"}}>
              <Typography style={{marginRight: "10px", display: "inline-flex", alignItems: "center"}}><StarIcon />{repo.stargazers_count}</Typography>
              <Typography style={{marginRight: "10px", display: "inline-flex", alignItems: "center"}}><ForkRightIcon />{repo.forks}</Typography>
            </Container>
          </Container>
          <Avatar variant="rounded" alt={"Profile IMG"} sx={{ width: 128, height: 128}}>{repo.name[0]}</Avatar>
        </Card>
      </CardActionArea>
    );
  }
