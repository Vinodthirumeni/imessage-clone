import React, { useState, useEffect } from "react";
import "./Chat.css";
import IconButton from "@material-ui/core/IconButton";
import MicNoneIcon from "@material-ui/icons/MicNone";
import Message from "./Message";
import { useSelector } from "react-redux"; //redux
import { selectChatName, selectChatId } from "./features/chatSlice"; //redux
import db from "./firebase";
import { selectUser } from "./features/userSlice"; //redux
import firebase from "firebase";
import FlipMove from "react-flip-move"

function Chat() {
  const [input, setInput] = useState("");
  const chatName = useSelector(selectChatName); //redux
  const chatId = useSelector(selectChatId); //redux
  const user = useSelector(selectUser); //redux
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("chats")
    .doc(chatId)
    .collection("messages")
    .add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      messages: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });
    setInput("");
  };

  return (
    <div className="chat">

      <div className="chat__header">
        <h4>
          To: <span className="chat__name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>

      <div className="chat__body">
        <FlipMove>
          {messages.map((message) => (
            <Message
              id={message.id}
              key={message.id}
              avatar={message.data.photo}
              timestamp={message.data.timestamp}
              messages={message.data.messages}
              email={message.data.email}
            />
          ))}
        </FlipMove>
      </div>

      <div className="chat__input">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send Message..."
            type="text"
          />
          <button onClick={sendMessage}> Send Message </button>
        </form>
        <IconButton>
          <MicNoneIcon className="chat__mic" />
        </IconButton>
      </div>
      
    </div>
  );
}

export default Chat;
