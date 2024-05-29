import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserStore from "./store/userStore.js";
import "bootstrap/dist/css/bootstrap.min.css";
const userStore = new UserStore();
const store = {
  userStore,
};
export const Context = React.createContext(store);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Context.Provider value={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);
