import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext.js";
// import GoatRanker from '../algorithms/ranker.js'
import Axios from "axios";

// material
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import LooksOneIcon from "@material-ui/icons/LooksOne";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  cover: {
    width: 350,
    height: "auto",
  },
  content: {
    flex: "1 0 auto",
    color: "white",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
}));

const CategoryShow = (props) => {
  const catName = props.location.pathname;
  const { userData, setUserData } = useContext(UserContext);
  const [category, setCategory] = useState(null);
  const [goat, setGoat] = useState(null);
  const history = useHistory();
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:740px)");

  let changes = matches ? "main-cont" : "cat-rank-sm";
  let changes2 = matches ? "cat-rank-cont" : "";
  console.log("catname", catName);
  console.log("category 2", category);
  console.log("goat", goat);

  const ShowArtist = async (spotify_id) => {
    history.push({
      pathname: `/artist/${spotify_id}`,
      spoitifyId: spotify_id,
      params: spotify_id,
    });
  };

  const getRanks = async () => {
    const req = await Axios.get(
      `https://nova-goat-ranker.herokuapp.com${catName}`
    );
    const goatInfo = await Axios.get(
      `https://nova-goat-ranker.herokuapp.com/artist/${req.data.ranked[0].artistId}`
    );
    setCategory(req.data);
    setGoat(goatInfo);
  };
  useEffect(() => {
    getRanks();
  }, []);

  return category ? (
    <>
      <br />
      <br />
      <br />
      <Typography className="cat-title" variant="h3">
        {category.category}
      </Typography>
      {goat ? (
        <>
          <br />
          <div className="any-cont">
            <div className="pad-it">
              <Card
                className={classes.root}
                onClick={() => {
                  ShowArtist(goat.data.artist.body.id);
                }}
              >
                <div className={classes.details}></div>
                <CardMedia
                  className={classes.cover}
                  image={goat.data.artist.body.images[0].url}
                  title={goat.data.artist.body.name}
                >
                  <CardContent className={classes.content}>
                    <Button variant="contained" color="primary">
                      {goat.data.artist.body.name}
                    </Button>
                    <div className="cat-hero">
                      <Button variant="contained" color="primary">
                        # <LooksOneIcon />
                      </Button>
                    </div>
                  </CardContent>
                </CardMedia>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Loading Goat</h1>
        </>
      )}
      <div className={changes}>
        <div className={changes2}>
          <List className={classes.root} aria-label="contacts">
            {category.ranked.map((item, index) => {
              return (
                <ListItem
                  onClick={() => {
                    history.push(`/artist/${item.artistId}`);
                  }}
                  button
                >
                  <ListItemText inset primary={`Rank: ${index + 1}`} />
                  <span />
                  <ListItemText inset primary={item.id} />
                  <span />
                  <Typography>Votes: {item.rank}</Typography>
                  <span />
                </ListItem>
              );
            })}
          </List>
        </div>
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
  );
};

export default CategoryShow;
