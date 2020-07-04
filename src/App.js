import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";
import UserContext from "./context/UserContext.js";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const App = (props) => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const matches = useMediaQuery("(min-width:760px)");
  return (
    <>
      <br />
      <br />
      <div className="background">
        <div className="main-cont">
          <div className="about">
            <div className="about-1">
              <h2>How it works</h2>
              <a href="https://www.dictionary.com/e/slang/g-o-a-t/">
                What is a GOAT anyway?
              </a>
              <p>
                <br /> Here you can search for your favorite artist just like
                you would on Spotify! <br />
                <br />
                Once you find your favorite artist. Take a look at the
                categories and see if you think they are worthy of a greatest of
                all time vote in that genre.
                <br />
              </p>
            </div>
            <div className="about-2">
              <p>
                Most votes in a category will make that artist the GOAT of that
                genre! <br /> <br /> Goats are displayed in their respective
                category pages!
              </p>
            </div>
          </div>
          <div className="spotify-cont">
            <h4 className="info-title">POWERED BY</h4>
            <img
              className="spotify-logo"
              src={require("./artwork/spotify-logo-png-7072.png")}
              alt="Spotify Logo"
            />
          </div>
          <a
            className="home-info-me"
            href="https://www.github.com/whoisdominic"
          >
            Created By Dominic Cobb
          </a>
        </div>
      </div>
    </>
  );
};

export default App;
