import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";

import Axios from "axios";
import { useFormik } from "formik";
import ClearFix from "../Clearfix/Clearfix.js";
import commas from "../algorithms/commas.js";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Button from "@material-ui/core/Button";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

// media query
import useMediaQuery from "@material-ui/core/useMediaQuery";

// material
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    color: "white",
  },
  cover: {
    width: 350,
    height: 300,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const SearchRes = (props) => {
  console.log("hey", `http://localhost:8000${props.location.pathname}`);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery("(min-width:740px)");
  const matchesBig = useMediaQuery("(min-width:110px)");
  const resMedia = matches ? "searchRes-mobile" : "";
  const history = useHistory();

  const [spotifySearch, setSpotifySearch] = useState(null);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    const response = await fetch(
      `http://localhost:8000${props.location.pathname}`
    );
    const result = await response.json();

    setSpotifySearch(result);
  };

  const ShowArtist = async (spotify_id) => {
    history.push({
      pathname: `/artist/${spotify_id}`,
      spoitifyId: spotify_id,
      params: spotify_id,
    });
  };

  let displayReady = [];

  return (
    <>
      <div className="main-cont">
        {matchesBig ? (
          <>
            <br />
            <br />
          </>
        ) : (
          <></>
        )}
        {spotifySearch ? (
          spotifySearch.body.artists.items.map((artist, i) => {
            if (artist.images.length > 1) {
              displayReady.push(artist);
              // results.splice(i, 1)
            }
          })
        ) : (
          <></>
        )}
        {spotifySearch ? (
          <>
            <div className={resMedia}>
              {displayReady.map((item, index) => {
                return (
                  <>
                    <div className="pad-it">
                      <Card
                        key={index}
                        className={classes.root}
                        onClick={() => {
                          ShowArtist(item.id);
                        }}
                      >
                        <div className={classes.details}></div>
                        <CardMedia
                          className={classes.cover}
                          image={item.images[0].url}
                          title="Live from space album cover"
                        >
                          <CardContent className={classes.content}>
                            <Button variant="contained" color="primary">
                              {item.name}
                            </Button>
                          </CardContent>
                        </CardMedia>
                      </Card>
                    </div>
                    <br />
                  </>
                );
              })}
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default SearchRes;
