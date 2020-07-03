import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";
import UserContext from "./context/UserContext.js";

const App = (props) => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  return (
    <>
      <br />
      <br />
      <div className="background">
        <div className="main-cont">
          <img
            className="index-img"
            src={require("./artwork/index_photo.jpeg")}
            alt="Concert"
          />
        </div>
      </div>
    </>
  );
};

export default App;
