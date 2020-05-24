import React from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  Button,
  CardMedia,
} from "@material-ui/core";

const Final = (props: any) => {
  const { location } = props;
  console.log(location.search.split("?playlist_id=")[1]);
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
            <Box display="flex" justifyContent="center">
              <Typography variant="h4" color="primary" paragraph={true}>
                Track Matcher for Spotify
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography
                variant="subtitle2"
                color="secondary"
                paragraph={true}
              >
                The playlist was created successfully and is now on your
                account!
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <CardMedia
                component="iframe"
                src={`https://open.spotify.com/embed/playlist/${
                  location.search.split("?playlist_id=")[1]
                }`}
                height="400"
                style={{ border: 0 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              To enjoy it, open your Spotify and click on the playlist named
              "Matched".
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button variant="contained" color="secondary" href="/home">
                Let's match again!
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export { Final };
