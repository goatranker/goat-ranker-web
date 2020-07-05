import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import Axios from "axios";
import Error from "./misc/ErrorDisplay.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./user.scss";
export default (Signup) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [username, setUsername] = useState();
  const [lastName, setLastName] = useState();
  const [firstName, setFirstName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (event) => {
    event.preventDefault();

    try {
      const newUser = {
        email,
        password,
        passwordCheck,
        username,
        firstName,
        lastName,
      };
      // console.log(newUser)
      await Axios.post(
        "https://nova-goat-ranker.herokuapp.com/users/signup",
        newUser
      );
      const loginRes = await Axios.post(
        "https://nova-goat-ranker.herokuapp.com/users/login",
        {
          username,
          password,
        }
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div>
      <br />
      <br />

      <h2 className="form-title">Signup</h2>
      {error && (
        <Error message={error} clearError={() => setError(undefined)} />
      )}
      <div className="any-cont form-cont">
        <form className="form-item" onSubmit={submit}>
          <TextField
            onChange={(event) => setUsername(event.target.value)}
            label="Username"
            variant="outlined"
            id="outlined-basic"
          />
          <br />
          <br />
          <TextField
            onChange={(event) => setEmail(event.target.value)}
            label="Email"
            variant="outlined"
            id="outlined-basic"
          />
          <br />
          <br />
          <TextField
            onChange={(event) => setPassword(event.target.value)}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
          />
          <br />
          <br />
          <TextField
            onChange={(event) => setPasswordCheck(event.target.value)}
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            type="password"
          />
          <br />
          <br />
          <TextField
            onChange={(event) => setFirstName(event.target.value)}
            id="outlined-basic"
            label="First Name"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(event) => setLastName(event.target.value)}
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
          />
          <br />
          <br />
          <Button
            type="submit"
            value="Signup"
            variant="outlined"
            color="primary"
          >
            Signup!
          </Button>
        </form>
      </div>

      {/* <SignupForm initial={blankUser} handleSubmit={handleCreate}></SignupForm> */}
    </div>
  );
};
