import { useState } from "react";
import socketClient from "socket.io-client";
const SERVER = "http://54.163.188.182:8000";

export const ChatScreen = () => {
  let socket = socketClient(SERVER);

  const [message, setMessage] = useState();
  const [data, setData] = useState([]);
  let roomId = localStorage.getItem("roomId");
  socket.on("connection", () => {
    console.log(`I'm connected with the back-end`);
  });
  socket.emit("join", roomId, (ack) => {
    console.log(ack);
  });
  socket.on(roomId, (data1) => {
    let array = [data];
    let userId = localStorage.getItem("userID");
    // array = data;
    let record = (
      <>
        <p className={userId === data1.senderId ? "left" : "right"}>
          {data1.content}
        </p>
      </>
    );
    array.push(record);
    setData(array);
  });

  const sendMessage = async () => {
    let data2 = {
      roomId,
      content: message,
      senderId: localStorage.getItem("userId"),
    };
    socket.emit("sendMessage", data2);
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
        <div className="chatScreen">{data}</div>
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
