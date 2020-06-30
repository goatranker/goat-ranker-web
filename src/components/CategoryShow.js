import React,{ useState, useEffect } from "react";
import { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import UserContext from "../context/UserContext.js"
import GoatRanker from '../algorithms/ranker.js'
import Axios from "axios";

const CategoryShow = (props) => {
    const catName = props.location.pathname
    const { userData, setUserData } = useContext(UserContext);
    const [ category, setCategory ] = useState(null)
    const history = useHistory()
    console.log('catname',catName);
    console.log('category 2',category);
    
    const getVotes = async () => {
        const req = await Axios.get(`http://localhost:8000${catName}`)
        setCategory(req)
        
    }
    useEffect(() => {
        getVotes()
    }, [])

    return (
        category? 
        <>
            <br/>
            <br/>
            <h1>{category.data.name}</h1>
            <ul>
            {category.data.userVotes.map((item, index) => {
                return (
                    <>
                    <li>{item.artistId}</li>
                    </>
                )
            })}
            </ul>
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