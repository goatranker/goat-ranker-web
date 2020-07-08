import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import Axios from "axios";

const Account = (props) => {
  const { userData, setUserData } = useContext(UserContext);
  const [userPull, setUserPull] = useState(null);
  const history = useHistory();

  const getUser = async (user) => {
    console.log("token", user.token);
    console.log("id", user.user.id);
    console.log("token", user.token);
    const options = {
      headers: {
        "x-auth-token": user.token,
        user_id: user.user.id,
      },
    };
    try {
      const response = await Axios.get(
        "https://nova-goat-ranker.herokuapp.com/users/account/",
        options
      );
      setUserPull(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userData.user ? getUser(userData) : history.push("users/login");
  }, []);

  return (
    <div className="account-container">
      {userData.user && userPull ? (
        <>
          <br />
          <br />
          <h1>Hello, {userData.user.username}!</h1>
          <h1>{userPull.data.firstName}</h1>
          <h1>{userPull.data.lastName}</h1>
        </>
      ) : (
        <>
          <br />
          <br />
          <h1>Not Logged in</h1>
        </>
      )}
    </div>
  );
};

export default Account;
