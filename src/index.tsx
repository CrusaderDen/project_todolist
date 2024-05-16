import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "750b834e-bc51-43bd-beec-013db0e3f0f0",
  },
};

const body = {
  email: "rupo@list.ru",
  password: "123",
  rememberMe: true,
};

const auth = () => {
  axios
    .post(
      "https://social-network.samuraijs.com/api/1.1/auth/login",
      body,
      settings,
    )
    .then((res) => console.log(res));
};

auth();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
