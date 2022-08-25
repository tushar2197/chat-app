import { useEffect, useState } from "react";
import socket from "./socket";
export const ChatScreen = () => {
  const [dataMessage, setDataMessage] = useState([]);
  const [message, setMessage] = useState();

  let data = JSON.parse(localStorage.getItem("roomData"));

  let roomId = localStorage.getItem("roomId"),
    userId = localStorage.getItem("userId");

  useEffect(() => {
    socket.emit("init", data);
  }, [roomId]);

  const onsubmit = () => {
    let chatData = {
      roomId: localStorage.getItem("roomId"),
      senderId: localStorage.getItem("userId"),
      content: message,
      receiverId: userId === data.drId ? data.patientId : data.drId,
    };

    let dataSend = {
      isRead: false,
      _id: "",
      content: message,
      senderId: userId,
    };
    let updatedData = [];
    updatedData = dataMessage;
    updatedData.push(dataSend);

    setDataMessage(updatedData);
    socket.emit("request", chatData);
  };

  socket.on(roomId, (data1) => {
    console.log("data1", data1);

    setDataMessage(data1.chatContent);
  });
  return (
    <>
      <div className="chat">
        <div className="header">
          <div className="name">
            {roomId + localStorage.getItem("username")}
          </div>
        </div>
        <div className="chatScreen" style={{ overFlow: "scroll" }}>
          {dataMessage?.map((x, index) => {
            return (
              <p
                key={index}
                className={x.senderId == userId ? "left" : "right"}
              >
                {x.content}
              </p>
            );
          })}
        </div>
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
