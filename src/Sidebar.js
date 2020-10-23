import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import IconButton from "@material-ui/core/IconButton";
import SidebarChat from "./SidebarChat";
import { useSelector } from "react-redux"; //redux
import { selectUser } from "./features/userSlice"; //redux
import db, { auth } from "./firebase";

function Sidebar() {
  const user = useSelector(selectUser); //redux
  const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection("chats")
    .onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const addChat = () => {
    const chatName = prompt("Please enter channel name...");
    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          onClick={() => auth.signOut()}
          className="sidebar__avatar"
          src={user.photo}
        />
        <div className="sidebar__input">
          <SearchIcon />
          <input placeholder="Search..." />
        </div>
        <IconButton varient="outlined" className="sidebar__inputButton">
          <RateReviewOutlinedIcon onClick={addChat} />
        </IconButton>
      </div>
      <div className="sidebar__chats">
        {chats.map((chat) => (
          <SidebarChat
            key={chat.id}
            id={chat.id}
            chatName={chat.data.chatName}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
