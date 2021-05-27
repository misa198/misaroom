import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import reportWebVitals from "./reportWebVitals";

import App from "./App";
import GlobalStyle from "./shared/styles/GlobalStyled";
import SocketProvider from "./shared/socket/SocketProvier";

ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
      <GlobalStyle />
      <App />
    </SocketProvider>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("misa-room")
);

reportWebVitals();
