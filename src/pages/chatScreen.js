import { useState } from "react";
import socketClient from "socket.io-client";
const SERVER = "http://3.82.115.123:8080";

export const ChatScreen = () => {
  let socket = socketClient(SERVER);

  const [message, setMessage] = useState();
  let roomId = localStorage.getItem("roomId");
  socket.on("connection", () => {
    console.log(`I'm connected with the back-end`);
  });
  socket.emit("join", roomId, (ack) => {
    console.log(ack);
  });
  socket.on(roomId, (data) => {
    console.log("daya", data);
  });

  const sendMessage = async () => {
    let data = {
      roomId,
      content: message,
      senderId: localStorage.getItem("userId"),
    };
    socket.emit("sendMessage", data);
    // let data = {
    //   senderId: localStorage.getItem("userId"),
    //   content: message,
    //   roomId: localStorage.getItem("roomId"),
    // };
  };
  return (
    <>
      <div className="chat">
        <div className="header">
          <div className="name">{localStorage.getItem("username")}</div>
        </div>
        <div className="chatScreen"></div>
        <div className="input">
          <input
            type="text"
            name="chat"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>send</button>
        </div>
      </div>
    </>
  );
};
