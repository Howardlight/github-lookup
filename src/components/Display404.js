import {
    Container,
    Typography,
    Paper,
} from "@mui/material"
import WarningIcon from '@mui/icons-material/Warning';

// TODO improve this
export default function Display404() {
  return(
    <div className='ProfileCard'>
      <Container style={{marginTop: "20px", marginBottom: "20px"}}>
        <Paper elevation={10} style={{padding: "20px", paddingLeft:"20px", paddingRight: "20px", display:"flex"}}>
          <Container style={{padding: "30px"}}>
            <Typography variant="h5" style={{display: "inline-flex", alignItems: "center"}}><WarningIcon fontSize="large" color="warning"/>404: User not found</Typography>
          </Container>
        </Paper>
      </Container>
    </div>
  );
}