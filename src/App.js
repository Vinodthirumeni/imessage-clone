import React, { useEffect } from "react";
import "./App.css";
import Imessage from "./Imessage";
import { useDispatch, useSelector } from "react-redux"; //redux
import { selectUser, login, logout } from "./features/userSlice"; //redux
import Login from "./Login";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser); //redux
  const dispatch = useDispatch(); //redux
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []); //reducer

  return <div className="app">{user ? <Imessage /> : <Login />}</div>;
}

export default App;
