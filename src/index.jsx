import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* Provider makes the Redux store available to every component below it
        via useSelector/useDispatch, without having to pass it down as props. */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
