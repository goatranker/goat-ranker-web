import React from 'react';
import Drawer from './drawer.js'
// everything from material

// for color control?
import { createMuiTheme } from '@material-ui/core/styles';



import { useContext } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom';
import UserContext from "../context/UserContext.js"
export default (props) => {

    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory()

    const createNew = () => {history.push("/new")}
    const account = () => {history.push("/users/account")}
    const signup = () => {history.push("/users/signup")}
    const login = () => {history.push("/users/login")}
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
            spotifyToken: undefined
        })
        localStorage.setItem('auth-token', '')
        history.push("/")
    }



        return(
<>  
        <Drawer></Drawer>
</>
 
    )
}



   {/* <nav className="grey darken-3 navbar-fixed">
          
            
            <div className="btn-function">
                {
                    userData.user? 
                        <div className="buttons">
                        <button onClick={logout}>Logout</button>
                        <button onClick={account}>Account</button>
                        </div> :
                    <div className="buttons">
                    <button onClick={login}>Log In</button>
                    <button  onClick={signup}>Signup</button>
                    </div>
                }
            </div>

             </nav> */}







