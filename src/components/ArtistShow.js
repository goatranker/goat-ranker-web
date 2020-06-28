import React,{ useState, useEffect } from "react";
import commas from '../algorithms/commas.js'
import Axios from 'axios'

// material
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';



const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(.5),
        width: theme.spacing(45),
        height: theme.spacing(200)
      }
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
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
                <div className="main-cont">
            {artist? 
            <>

                <div className={classes.root}>
                <br/><br/><br/>    
                <Paper elevation={3}>
                    <img id="artist-show-img" src={artist.artist.body.images[0].url} alt={`An image of ${artist.artist.body.name}`} />
                    <Typography variant="h2" color="textPrimary">{artist.artist.body.name}</Typography>
                    <Typography variant="h6" color="textPrimary">Popularity Score: {artist.artist.body.popularity}</Typography>
                    <Typography variant="h6" color="textPrimary">Spotify Followers: {commas(artist.artist.body.followers.total)}</Typography>  

                    {artist.artist.body.genres.map((item, index) => {
                        return (
                            <>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                <Typography className={classes.heading}>{item}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                <Button variant="contained" color="primary">
                                    Vote for {artist.artist.body.name}
                                </Button>
                           
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            </>
                        )
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
                                            <ListItem>
                                            <ListItemIcon>
                                                <PlayArrowIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.name}
                                               
                                            />
                                            </ListItem>
                                            </>
                                        )
                                    })}
                                </List>
                            </div>
                            </Grid>
                        </Grid>
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
            </div>
            </>
    )
}

export default AristShow;