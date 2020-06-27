import React,{ useState, useEffect } from "react";
import Axios from 'axios'
import { useFormik } from 'formik'
import ClearFix from '../Clearfix/Clearfix.js'
import commas from '../algorithms/commas.js'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// material

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });
  


const SearchRes = (props) => {
    console.log('hey', `http://localhost:8000${props.location.pathname}`);
    const classes = useStyles();

    const [spotifySearch, setSpotifySearch] = useState(null)
    
        useEffect(() => {
            getResults()
        }, [])


    const getResults = async () => {
            const response = await fetch(`http://localhost:8001${props.location.pathname}`)
            const result = await response.json();
            
            setSpotifySearch(result)
            
    }

    let displayReady = [];

  return (
    <>
      <h3>Results</h3>
      {spotifySearch?     spotifySearch.body.artists.items.map((artist, i) => {
        if (artist.images.length > 1) {
          displayReady.push(artist);
          // results.splice(i, 1)
        }
      }) : <></>
      }
    {spotifySearch? 
    displayReady.map((item, index) => {
        return (
            <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={item.name}
                height="140"
                image={item.images[0].url}
                title={item.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {`Followers: ${commas(item.followers.total)}`}
                </Typography>
                <Typography>
                {`Spotify Popularity: ${item.popularity}`}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Votes
              </Button>
              <Button size="small" color="primary">
                Listen
              </Button>
            </CardActions>
          </Card>
        )
    })
    :
    <>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <div class="cssload-weird">	
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
</div>
</>
    }
    </>
  );
}

export default SearchRes;



