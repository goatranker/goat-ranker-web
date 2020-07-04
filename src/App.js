import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";
import UserContext from "./context/UserContext.js";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
          {/* <img
            className="index-img"
            src={require("./artwork/index_photo.jpeg")}
            alt="Concert"
          /> */}
        </div>
        <span>{`(min-width:760px) matches: ${matches}`}</span>
      </div>
    </>
  );
};

export default App;
