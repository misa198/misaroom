import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import reportWebVitals from "./reportWebVitals";

import App from "./App";
import GlobalStyle from "./shared/styles/GlobalStyled";
import SocketProvider from "./shared/socket/SocketProvider";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <GlobalStyle />
        <App />
      </SocketProvider>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("misa-room")
);

reportWebVitals();
