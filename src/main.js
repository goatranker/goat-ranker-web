import React, { useState, useEffect} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Axios from 'axios'

import Home from "./App";
import Account from "./user/Account.js";
import Signup from "./user/Signup.js";
import Login from "./user/Login.js"
import MainNav from './MainNav/index.js'
import Search from './components/SearchRes.js'

import UserContext from './context/UserContext.js'

const routes = [
    {
        path: "/search",
        component: Search,
        name: "Search"
    },
    {
        path: "/users/account",
        component: Account,
        name: "Account"
    },
    {
        path: "/users/login",
        component: Login,
        name: "Login"
    },
    {
        path: "/users/signup",
        component: Signup,
        name: "Signup"
    },
    {
        path: "/",
        component: Home,
        name: "Home"
    },
]

export default () => {

    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
        spotifyToken: undefined
    })
    
    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token")
            if (token === null){
                localStorage.setItem("auth-token", '')
                token = ''
            }
            const tokenResponse = await Axios.post('http://localhost:8000/users/tokenisvalid', null, {
                headers: {"x-auth-token": token} } 
            )
            if (tokenResponse.data){
                const userRespone = await Axios.get('http://localhost:8000/users/tokenisvalid/users', {
                    headers: {'x-auth-token': token},
                })
                setUserData({
                    token,
                    user: userRespone.data,
                    spotifyToken: undefined
                })
            }
        }
        checkLoggedIn()
    },[])

    return (
        <>
        <BrowserRouter>
        <UserContext.Provider value={{userData, setUserData}}>
        <MainNav id="main-nav" />
        <Switch>
            {
                routes.map((route)=>{
                    return (
                        <Route path={route.path}
                        component={route.component}
                        key={route.name}></Route>
                        )
                    })
                }
        </Switch>

        </UserContext.Provider>
        </BrowserRouter>
        </>
    )
}

export {
    routes
}


