import React,{ useState, useEffect } from "react";
import Axios from 'axios'
import { useFormik } from 'formik'
import ClearFix from '../Clearfix/Clearfix.js'

const SearchRes = (props) => {
    console.log('hey', `http://localhost:8000${props.location.pathname}`);
   
    const [spotifySearch, setSpotifySearch] = useState(null)
    
        useEffect(() => {
            getResults()
        }, [])


    const getResults = async () => {
            const response = await fetch(`http://localhost:8001${props.location.pathname}`)
            const result = await response.json();
            
            setSpotifySearch(result)
            
    }




  return (
    <>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto soluta omnis similique molestias quis consequuntur! Veniam provident illo perspiciatis, quod reiciendis architecto vero facilis earum adipisci porro. Sint, fuga quod ullam alias iste officiis! Nemo numquam dolores optio, aperiam maxime, ducimus quasi et dignissimos perspiciatis pariatur nam perferendis! Exercitationem, velit!</p>
      <h3>Results</h3>


    {spotifySearch? 
    spotifySearch.body.artists.items.map((item, index) => {
        return (
            <div><h2>{item.name}</h2></div>
        )
    })
    :
    <h2>Loading...</h2>
    
    
    }




    </>
  );
}

export default SearchRes;



