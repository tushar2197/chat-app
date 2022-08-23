import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ChatRoom = () => {
  let navigate = useNavigate();
  const joinChat = async () => {
    let config = {
      method: "post",
      url: "http://3.82.115.123:5001/api/v1/chat-room/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        drId: "62ef944d81cbda2d545341ae",
        appointmentId: "62fcc57bc12443789b9fcd1a",
        patientId: "62f226d12ca70035ca1b0343",
      },
    };
    let dataResponse = await axios(config);
    if (dataResponse) {
      console.log("dataResponse.data.", dataResponse.data);
      localStorage.setItem("roomId", dataResponse.data.roomId);
      navigate("/chat/message");
    }
  };
  return <button onClick={joinChat}>Join</button>;
};
