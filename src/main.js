import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import Axios from "axios";

// Components
import Home from "./App";
import Account from "./user/Account.js";
import Signup from "./user/Signup.js";
import Login from "./user/Login.js";
import MainNav from "./MainNav/index.js";
import Search from "./components/SearchRes.js";
import ArtistShow from "./components/ArtistShow.js";
import CategoryShow from "./components/CategoryShow.js";
import AllCategories from "./components/AllCategories.js";
import MyVotes from "./user/MyVotes.js";
import UserContext from "./context/UserContext.js";

const routes = [
  {
    path: "/categories/all",
    component: AllCategories,
    name: "AllCategories",
  },
  {
    path: "/categories/",
    component: CategoryShow,
    name: "CategoryShow",
  },
  {
    path: "/artist/",
    component: ArtistShow,
    name: "ArtistShow",
  },
  {
    path: "/search/",
    component: Search,
    name: "Search",
  },
  {
    path: "/users/myvotes",
    component: MyVotes,
    name: "MyVotes",
  },
  {
    path: "/users/account",
    component: Account,
    name: "Account",
  },
  {
    path: "/users/login",
    component: Login,
    name: "Login",
  },
  {
    path: "/users/signup",
    component: Signup,
    name: "Signup",
  },
  {
    path: "/",
    component: Home,
    name: "Home",
  },
];

export default () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    spotifyToken: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await Axios.post(
        "https://nova-goat-ranker.herokuapp.com/users/tokenisvalid",
        null,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (tokenResponse.data) {
        const userRespone = await Axios.get(
          "https://nova-goat-ranker.herokuapp.com/users/tokenisvalid/users",
          {
            headers: { "x-auth-token": token },
          }
        );
        setUserData({
          token,
          user: userRespone.data,
          spotifyToken: undefined,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
          <UserContext.Provider value={{ userData, setUserData }}>
            <MainNav id="main-nav" />
            <Switch>
              {routes.map((route) => {
                return (
                  <Route
                    path={route.path}
                    component={route.component}
                    key={route.name}
                  ></Route>
                );
              })}
            </Switch>
          </UserContext.Provider>
        </BrowserRouter>
      </React.Fragment>
    </>
  );
};

export { routes };
