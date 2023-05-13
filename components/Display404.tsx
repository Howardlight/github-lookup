import {
  Container,
  Typography,
  Paper,
} from "@mui/material"
import WarningIcon from '@mui/icons-material/Warning';
import styles from "./Display404.module.css";
import React from "react";


// TODO improve this
export default function Display404() {
  return (
    <div className='ProfileCard'>
      <Container className={styles.mainContainer}>
        <Paper elevation={10} className={styles.paper} style={{ alignItems: "center", justifyContent: "spacedEvenly" }}>
          <Container className={styles.secondaryContainer}>
            <Typography variant="h5"
              className={styles.textContent}
            >
              <WarningIcon
                fontSize="large"
                color="warning"
                style={{ marginRight: "7px" }}
              />
              404: User not found
            </Typography>
          </Container>
        </Paper>
      </Container>
    </div>
  );
}