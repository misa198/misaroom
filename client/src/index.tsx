import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import reportWebVitals from "./reportWebVitals";

import App from "./App";
import GlobalStyle from "./shared/styles/GlobalStyled";

import store from "./store";

import { SocketProvider } from "./contexts/socket.context";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <GlobalStyle />
        <App />
      </SocketProvider>
    </Provider>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("misa-room")
);

reportWebVitals();
