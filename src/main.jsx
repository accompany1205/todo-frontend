import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";
import store from "./store";
import App from "./App.jsx";
import "./index.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </Provider>
  </React.StrictMode>
);
