import React,{ useState, useEffect } from "react";
import commas from '../algorithms/commas.js'
import Axios from 'axios'

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(50),
        height: theme.spacing(70)
      }
    }
  }));

const AristShow = (props) => {

    const classes = useStyles();
    const [artist, setArtist] = useState(null)
    
    useEffect(() => {
        getArtist()
    }, [])
    
    const getArtist = async () => {
        const response = await fetch(`http://localhost:8000${props.location.pathname}`)
        const result = await response.json()
        
        setArtist(result)
    }

    return (
            <>
            {artist? 
            <>
                <div className={classes.root}>
                <br/><br/><br/>    
                <Paper elevation={3}>
                    <Typography variant="body2" color="textPrimary">{artist.artist.body.name}</Typography>
                    <img id="artist-show-img" src={artist.artist.body.images[0].url} alt={`An image of ${artist.artist.body.name}`} />
                    <Typography variant="body2" color="textPrimary">Popularity Score: {artist.artist.body.popularity}</Typography>
                    <Typography variant="body2" color="textPrimary">Spotify Followers: {commas(artist.artist.body.followers.total)}</Typography>
                </Paper> 
                </div>
            </> 
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
    )
}

export default AristShow;