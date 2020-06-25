import React, { useContext, createContext} from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom';
import UserContext from "../context/UserContext.js"
import { logDOM } from '@testing-library/react';

export default (props) => {
    const { userData, setUserData } = useContext(UserContext)    
    console.log(userData);
    
    
    return(
        <div className="account-container">
            
        </div>
        
    )
}
