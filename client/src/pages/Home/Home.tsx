import React from "react";
import { Grid, Paper, Typography, TextField, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
const Home = () => {
  return (
    <Grid container>
      <Paper>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h1">Track Matcher for Spotify</Typography>
            <Typography variant="h3">This is a page with text</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="user"
              label="Insira seu usuário"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="friend1"
              label="Insira o usuário do seu amigo"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" endIcon={<Add />}>
              New user
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

// const Home = HomePage;
export { Home };
