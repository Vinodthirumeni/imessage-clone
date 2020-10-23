import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";

function Login() {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      // .then((result) => {
      //   dispatch({
      //     type: actionTypes.SET_USER,
      //     user: result.user,
      //   });
      // })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/56/IMessage_logo_%28Apple_Inc.%29.png"
          alt="#logo"
        />
        <h1>iMessage</h1>
      </div>
      <Button onClick={signIn}>Sign IN </Button>
    </div>
  );
}

export default Login;
