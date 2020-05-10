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
import { Add, RemoveCircle, Delete } from "@material-ui/icons";
const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
          <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <Typography variant="h4" color="primary" paragraph={true}>
                Track Matcher for Spotify
              </Typography>
              <Typography
                variant="subtitle2"
                color="secondary"
                paragraph={true}
              >
                This is a tool for finding songs that you share with someone
                through your public playlists. The app needs Spotify permissions
                so that it can create the playlist. You can find an user’s URI
                through the sharing options on their profile page.
              </Typography>
              <Typography
                variant="subtitle2"
                paragraph={true}
                color="secondary"
              >
                When matching with multiple users, you can define the minimum
                number of occurences between them (e.g. only 2 occurences of the
                same song needed between me and 4 friends).
              </Typography>
            </Grid>
            {isLoggedIn ? (
              <Fragment>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    paragraph={true}
                    color="secondary"
                  >
                    Add your friends here:
                  </Typography>
                </Grid>

                {inputFields.map((inputFields, index) => (
                  <Fragment key={`${inputFields}~${index}`}>
                    <Grid container spacing={2}>
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
                          onChange={(event) => handleInputChange(index, event)}
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
                    </Grid>
                  </Fragment>
                ))}

                <Grid item xs={12}>
                  <Box marginTop={2}>
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
          </form>
        </Grid>
      </Paper>
    </Box>
  );
};

// const Home = HomePage;
export { Home };
