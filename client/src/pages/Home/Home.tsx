import React, { useState, Fragment } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [addMore, setAddMore] = useState(false);

  const handleAddFriends = () => {
    console.log(addMore);
    if (!addMore) {
      setAddMore(true);
    } else {
      setAddMore(false);
    }
  };
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
              This is a tool for finding songs that you share with someone
              through your public playlists. The app needs Spotify permissions
              so that it can create the playlist. You can find an user’s URI
              through the sharing options on their profile page.
            </Typography>
            <Typography variant="subtitle2" color="secondary">
              When matching with multiple users, you can define the minimum
              number of occurences between them (e.g. only 2 occurences of the
              same song needed between me and 4 friends).
            </Typography>
          </Grid>
          {isLoggedIn ? (
            <Fragment>
              <Grid item xs={12}>
                <Typography variant="body1" color="secondary">
                  Add your friends here:
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="friend1"
                  label="Spotify URI"
                  placeholder="e.g. spotify:user:0394820913"
                  variant="outlined"
                  color="primary"
                  size="small"
                />
              </Grid>
              {addMore && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="friend1"
                    label="Spotify URI"
                    placeholder="e.g. spotify:user:0394820913"
                    variant="outlined"
                    color="primary"
                    size="small"
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  color="inherit"
                  size="small"
                  endIcon={<Add />}
                  onClick={handleAddFriends}
                >
                  Add friend
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <Button variant="contained" color="secondary">
                    Match!
                  </Button>
                </Box>
              </Grid>
            </Fragment>
          ) : (
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Button variant="contained" color="primary">
                  Login in Spotify
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

// const Home = HomePage;
export { Home };
