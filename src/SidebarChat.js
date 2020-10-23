import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch } from "react-redux"; //redux
import { setChat } from "./features/chatSlice"; //redux
import db from "./firebase";
import * as timeago from "timeago.js";

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);

  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <div
      onClick={() =>
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        )
      } //redux
      className="sidebarChat"
    >
      <Avatar />
      <div className="sidebarChat__info">
        <h3>{chatName}</h3>
        <p>{chatInfo[0]?.messages}</p>
        <small>
          {timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()).toLocaleString())}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;
