import { useEffect, useState } from "react";
import socket from "./socket";
export const ChatScreen = () => {
  let roomId = localStorage.getItem("roomId");

  useEffect(() => {
    socket.emit("init", roomId);
  }, [roomId]);
  const [id, setId] = useState();

  const [message, setMessage] = useState();

  const onsubmit = () => {
    let chatData = {
      roomId: localStorage.getItem("roomId"),
      userId: localStorage.getItem("userId"),
      content: message,
    };
    socket.emit("request", chatData);
  };
  console.log("roomId", roomId);
  socket.on(roomId, (data) => console.log(data));
  return (
    <>
      <div className="chat">
        <div className="header">
          <div className="name">
            {roomId + localStorage.getItem("username") + id}
          </div>
        </div>
        <div className="chatScreen"></div>
        <div className="text">
          <input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <button onClick={onsubmit}>submit</button>
        </div>
      </div>
    </>
  );
};
