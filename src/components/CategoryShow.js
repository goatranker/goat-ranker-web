import React,{ useState, useEffect } from "react";
import { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import UserContext from "../context/UserContext.js"
// import GoatRanker from '../algorithms/ranker.js'
import Axios from "axios";

// material 
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

const CategoryShow = (props) => {
    const catName = props.location.pathname
    const { userData, setUserData } = useContext(UserContext);
    const [ category, setCategory ] = useState(null)
    const history = useHistory()
    const classes = useStyles();

    console.log('catname',catName);
    console.log('category 2',category);
    
    const getRanks = async () => {
        const req = await Axios.get(`http://localhost:8000${catName}`)
        setCategory(req.data)
    }
    useEffect(() => {
        getRanks()
    }, [])

    return (
        category? 
        <>
            <br/>
            <br/>
            <h1>{category.category.name}</h1>



            <List component="nav" className={classes.root} aria-label="contacts">
            {category.ranked.map((item, index) => {
                return (
                     <ListItem button>
                    <ListItemText inset primary={item.id}/>
                    </ListItem>
                )
            })}
            </List>
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
    )

}   

export default CategoryShow