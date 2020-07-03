import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import Axios from "axios";
import Error from "./misc/ErrorDisplay.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (event) => {
    event.preventDefault();

    try {
      const loginUser = { password, username };
      // console.log(loginUser)
      await Axios.post("http://localhost:8000/users/login", loginUser);
      const loginRes = await Axios.post("http://localhost:8000/users/login", {
        username,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("x-auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <>
      <br />
      <br />
      <h2 className="form-title">Login</h2>
      <div className="any-cont">
        <div className="main-cont">
          {error && (
            <Error message={error} clearError={() => setError(undefined)} />
          )}
          <form className="form-item" onSubmit={submit}>
            <TextField
              onChange={(event) => setUsername(event.target.value)}
              id="outlined-basic"
              label="Username"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              onChange={(event) => setPassword(event.target.value)}
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
            />
            <br />
            <br />
            <Button
              type="submit"
              value="Login"
              variant="outlined"
              color="primary"
            >
              Login!
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
