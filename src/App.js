import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { ChatRoom } from "./pages/chatRoom";
import { ChatScreen } from "./pages/chatScreen";
import { LoginDr } from "./pages/loginDr";
import { Fragment } from "react";

function App() {
  return (
    <Routes>
      <Fragment>
        <Route path={"/"} element={<Login />} />
        <Route path={"/otp"} element={<LoginDr />} />
        <Route path={"/chat/create"} element={<ChatRoom />} />
        <Route path={"/chat/message"} element={<ChatScreen />} />
      </Fragment>
    </Routes>
  );
}

export default App;
