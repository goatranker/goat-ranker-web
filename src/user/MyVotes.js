import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext.js";
import { useHistory } from "react-router-dom";
import Axios from "axios";
// material
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(44),
      height: theme.spacing(44),
    },
  },
}));

const MyVotes = (props) => {
  const { userData, setUserData } = useContext(UserContext);
  const [userPull, setUserPull] = useState(null);
  const history = useHistory();
  const theme = createMuiTheme({});
  const classes = useStyles();

  const getUser = async (user) => {
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
    } catch (error) {}
  };
  useEffect(() => {
    userData.user ? getUser(userData) : history.push("/users/login");
  }, []);
  return (
    <>
      <div className="account-container">
        {userData.user && userPull ? (
          <>
            <br />
            <br />
            <h1>Hello, {userData.user.username}!</h1>
            {userPull.data.votes.length < 1 ? (
              <>
                <br /> <h3>No Votes Yet</h3>
              </>
            ) : (
              <>
                {userPull.data.votes.map((item, index) => {
                  return <Typography variant="h4">Ok</Typography>;
                })}
              </>
            )}
          </>
        ) : (
          <>
            <br />
            <br />
            <h1>Not Logged in</h1>
          </>
        )}
      </div>
    </>
  );
};

export default MyVotes;
