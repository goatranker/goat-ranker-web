import React, { useState, useEffect } from "react";
import commas from "../algorithms/commas.js";
import Axios from "axios";
import $ from "jquery";
// material
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext.js";

import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
      width: theme.spacing(45),
      height: theme.spacing(200),
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    margin: "auto",
    width: "90%",
    height: "auto",
  },
}));

const AristShow = (props) => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();
  const [artist, setArtist] = useState(null);
  const matches = useMediaQuery("(min-width:740px)");
  const matchesLarge = useMediaQuery("(min-width:1200px)");

  const getArtist = async () => {
    const response = await fetch(
      `http://localhost:8000${props.location.pathname}`
    );
    const result = await response.json();
    console.log(result);

    setArtist(result);
  };

  const handleVote = async (category, spotifyId, user, artistName) => {
    console.log(category, spotifyId, user.user.id);
    const response = await Axios.post(
      `http://localhost:8000/categories/${category}`,
      {
        user_id: user.user.id,
        name: category,
        artistId: spotifyId,
        artistName: artistName,
      }
    );
    console.log(response);
    history.push(`/categories/${category}`);
  };
  const handleNotLoggedin = async () => {
    console.log("Must be logged in to vote");
    history.push("/users/login");
  };

  const handlePlay = async (songUri) => {
    setUserData({
      ...userData,
      currentSong: songUri,
    });
  };

  useEffect(() => {
    getArtist();
  }, []);

  return (
    <>
      <br />
      <br />
      {artist ? (
        <>
          {matches ? (
            <>
              <br />
              <br />
              <Paper className={classes.paper} elevation={4}>
                <div className="artist-show-cont">
                  <img
                    className="artist-show-img-large"
                    src={artist.artist.body.images[0].url}
                    alt={`${artist.artist.body.name}`}
                  />
                  <div className="artist-info-cont">
                    <Typography variant="h2" color="textPrimary">
                      {artist.artist.body.name}
                    </Typography>
                    <Typography variant="h6" color="textPrimary">
                      Popularity Score: {artist.artist.body.popularity}
                    </Typography>
                    <Typography variant="h6" color="textPrimary">
                      Spotify Followers:{" "}
                      {commas(artist.artist.body.followers.total)}
                    </Typography>
                    {artist.artist.body.genres.map((item, index) => {
                      return (
                        <>
                          <ExpansionPanel>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className={classes.heading}>
                                {item}
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              {userData.user ? (
                                <Button
                                  onClick={() => {
                                    handleVote(
                                      item,
                                      artist.artist.body.id,
                                      userData,
                                      artist.artist.body.name
                                    );
                                  }}
                                  variant="contained"
                                  color="primary"
                                >
                                  Vote for {artist.artist.body.name}
                                </Button>
                              ) : (
                                <Button
                                  onClick={handleNotLoggedin}
                                  variant="contained"
                                  color="primary"
                                >
                                  Login to vote for {artist.artist.body.name}
                                </Button>
                              )}
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        </>
                      );
                    })}
                  </div>
                  {matchesLarge ? (
                    <div className="artist-songs-cont">
                      {artist.tracks.body.tracks.map((item, index) => {
                        return (
                          <>
                            <ListItem>
                              <ListItemIcon
                                onClick={() => {
                                  handlePlay(item.uri);
                                }}
                              >
                                <PlayArrowIcon />
                              </ListItemIcon>
                              <Button
                                className="artist-show-btn"
                                onClick={() => {
                                  handlePlay(item.uri);
                                }}
                                variant="outlined"
                                color="primary"
                              >
                                {item.name}
                              </Button>
                            </ListItem>
                          </>
                        );
                      })}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                {matchesLarge ? (
                  <></>
                ) : (
                  <div className="artist-songs-cont">
                    {artist.tracks.body.tracks.map((item, index) => {
                      return (
                        <>
                          <ListItem>
                            <ListItemIcon>
                              <PlayArrowIcon />
                            </ListItemIcon>
                            <Button
                              className="artist-show-btn"
                              onClick={() => {
                                handlePlay(item.uri);
                              }}
                              variant="outlined"
                              color="primary"
                            >
                              {item.name}
                            </Button>
                          </ListItem>
                        </>
                      );
                    })}
                  </div>
                )}
              </Paper>
            </>
          ) : (
            <>
              <div className="main-cont">
                <div className={classes.root}>
                  <br />
                  <br />
                  <br />
                  <Paper elevation={4}>
                    <img
                      id="artist-show-img"
                      src={artist.artist.body.images[0].url}
                      alt={`${artist.artist.body.name}`}
                    />
                    <Typography variant="h2" color="textPrimary">
                      {artist.artist.body.name}
                    </Typography>
                    <Typography variant="h6" color="textPrimary">
                      Popularity Score: {artist.artist.body.popularity}
                    </Typography>
                    <Typography variant="h6" color="textPrimary">
                      Spotify Followers:{" "}
                      {commas(artist.artist.body.followers.total)}
                    </Typography>

                    {artist.artist.body.genres.map((item, index) => {
                      return (
                        <>
                          <ExpansionPanel>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className={classes.heading}>
                                {item}
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              {userData.user ? (
                                <Button
                                  onClick={() => {
                                    handleVote(
                                      item,
                                      artist.artist.body.id,
                                      userData,
                                      artist.artist.body.name
                                    );
                                  }}
                                  variant="contained"
                                  color="primary"
                                >
                                  Vote for {artist.artist.body.name}
                                </Button>
                              ) : (
                                <Button
                                  onClick={handleNotLoggedin}
                                  variant="contained"
                                  color="primary"
                                >
                                  Login to vote for {artist.artist.body.name}
                                </Button>
                              )}
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        </>
                      );
                    })}
                    <div className="any-cont">
                      <Button variant="contained" color="secondary">
                        Listen on Spotify
                      </Button>
                    </div>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <div className={classes.demo}>
                          <List>
                            {artist.tracks.body.tracks.map((item, index) => {
                              return (
                                <>
                                  <ListItem
                                    onClick={() => {
                                      handlePlay(item.uri);
                                    }}
                                  >
                                    <ListItemIcon>
                                      <PlayArrowIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                  </ListItem>
                                </>
                              );
                            })}
                          </List>
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="main-cont">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div class="cssload-weird">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AristShow;
