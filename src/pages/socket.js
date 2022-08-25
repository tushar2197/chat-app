import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://54.163.188.182:8000", {
  extraHeaders: {
    "Access-Control-Allow-Origin": "*",
  },
});
export default socket;
