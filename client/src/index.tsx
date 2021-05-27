import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
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
  </React.StrictMode>,
  document.getElementById("misa-room")
);

reportWebVitals();
