import React,{ useState, useEffect } from "react";
import commas from '../algorithms/commas.js'
import Axios from 'axios'

const AristShow = (props) => {

    console.log('artist show', `http://localhost:8000${props.location.pathname}`);
    
    const [artist, setArtist] = useState(null)
    
    
    
    const getArtist = async () => {
        const response = await fetch(`http://localhost:8000${props.location.pathname}`)
        const result = await response.json()
        
        setArtist(result)
    }

    useEffect(() => {
        getArtist()
    }, [])

    return (
        <div>Artist show</div>
    )
}

export default AristShow