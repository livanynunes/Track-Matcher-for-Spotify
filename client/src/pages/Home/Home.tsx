import React, { useState, Fragment } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
} from "@material-ui/core";
import { Add, Delete, ExitToApp } from "@material-ui/icons";

function getUrlParams(search: string): any {
  let hashes = search.slice(search.indexOf("?") + 1).split("&");
  return hashes.reduce((params, hash) => {
    let [key, val] = hash.split("=");
    return Object.assign(params, { [key]: decodeURIComponent(val) });
  }, {});
}

const Home = (props: any) => {
  const { location } = props;
  const params = getUrlParams(location.search);
  const token = params.access_token;

  const [inputFields, setInputFields] = useState([
    { value: "", selected: false },
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];

    values.push({ value: "", selected: false });
    setInputFields(values);
  };

  const handleRemoveField = (index: any) => {
    const values = [...inputFields];

    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (
    index: any,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const values = [...inputFields];

    if (event.target.name === "friendUri") {
      values[index].value = event.target.value;
    }

    // event.target.onb
    setInputFields(values);
  };

  const showRemoveButton = (index: any) => {
    const values = [...inputFields];
    values[index].selected = true;
    setInputFields(values);
  };

  const hideRemoveButton = (index: any) => {
    const values = [...inputFields];
    values[index].selected = false;
    setInputFields(values);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("inputField", inputFields);

    const queryParams = [];
    const history = [];
    for (let i in inputFields) {
      queryParams.push("friend=" + encodeURIComponent(inputFields[i].value));
    }
    const queryString = queryParams.join("&");
    history.push(queryString);
    console.log(token);
    window.location.href = `http://localhost:8888/match?access_token=${token}&${history}`;
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
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="h4" color="primary" paragraph={true}>
                Track Matcher for Spotify
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="small"
                  endIcon={<ExitToApp />}
                  href=" https://accounts.spotify.com/en/logout"
                >
                  Logout
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="secondary" paragraph={true}>
              This is a tool for finding songs that you share with someone
              through your public playlists. The app needs Spotify permissions
              so that it can create the playlist. You can find an user’s URI
              through the sharing options on their profile page.
            </Typography>
            <Typography variant="subtitle2" paragraph={true} color="secondary">
              When matching with multiple users, you can define the minimum
              number of occurences between them (e.g. only 2 occurences of the
              same song needed between me and 4 friends).
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1" paragraph={true} color="secondary">
                  Add your friends here:
                </Typography>
              </Grid>

              {inputFields.map((inputFields, index) => (
                <Fragment key={`${inputFields}~${index}`}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="friendUri"
                      name="friendUri"
                      value={inputFields.value}
                      label="Spotify URI"
                      placeholder="e.g. spotify:user:0394820913"
                      variant="outlined"
                      color="primary"
                      size="small"
                      onFocus={() => showRemoveButton(index)}
                      onBlur={() => hideRemoveButton(index)}
                      onChange={(event: any) => handleInputChange(index, event)}
                      InputProps={
                        inputFields.selected
                          ? {
                              endAdornment: (
                                <IconButton
                                  onMouseDown={() => {
                                    handleRemoveField(index);
                                  }}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              ),
                            }
                          : {
                              endAdornment: <></>,
                            }
                      }
                    />
                  </Grid>
                </Fragment>
              ))}
              <Grid item xs={12}>
                <Box>
                  <Button
                    variant="contained"
                    fullWidth
                    color="inherit"
                    size="small"
                    endIcon={<Add />}
                    onClick={() => {
                      handleAddFields();
                    }}
                  >
                    Add friend
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" marginTop={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    onSubmit={handleSubmit}
                  >
                    Match!
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Box>
  );
};

// const Home = HomePage;
export { Home };
