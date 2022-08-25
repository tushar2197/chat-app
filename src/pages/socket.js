import socketIOClient from "socket.io-client";
const socket = socketIOClient(
  "https://db9f-2401-4900-1f3f-5346-84a9-3c7c-2f6a-c3e7.in.ngrok.io",
  {
    extraHeaders: {
      "Access-Control-Allow-Origin": "*",
    },
  }
);
export default socket;
