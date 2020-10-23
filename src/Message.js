import React, { forwardRef } from "react";
import "./Message.css";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux"; //redux
import { selectUser } from "./features/userSlice"; //redux

const Message = forwardRef(
  ({ id, avatar, timestamp, messages, email }, ref) => {
    const user = useSelector(selectUser); //redux
    return (
      <div
        ref={ref}
        className={`message ${user.email === email && "message__sender"}`}
      >
        <Avatar className="message__photo" src={avatar} alt="#avatar" />
        <p>{messages}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
    );
  }
);

export default Message;
