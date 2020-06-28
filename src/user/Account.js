import React, { useContext, createContext} from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom';
import UserContext from "../context/UserContext.js"

export default (props) => {
    const { userData, setUserData } = useContext(UserContext)    
    
    
    return(
        <div className="account-container">
            
        </div>
        
    )
}
