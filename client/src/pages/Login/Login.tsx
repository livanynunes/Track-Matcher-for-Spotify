import React from "react";
import { Box, Paper, Grid, Typography, Button } from "@material-ui/core";

const Login = () => {
  return (
    <Box
      component="div"
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ height: "100%" }}
    >
      <Paper style={{ padding: 20, maxWidth: 700 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary" paragraph={true}>
              Track Matcher for Spotify
            </Typography>
            <Typography variant="subtitle2" color="secondary" paragraph={true}>
              First you need to logged in your Spotify acount.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                href="http://localhost:8888/login"
              >
                Login in Spotify
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export { Login };
