import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./store";
import reportWebVitals from "./reportWebVitals";

async function main() {
  if (window.location.pathname === "/demo-react-app") {
    window.location.pathname = "/demo-react-app/";
  }

  // wallet balances are loaded into sessionStorage, so they will persist across refreshes
  if (
    !sessionStorage.getItem("wallet_1_balance") ||
    !sessionStorage.getItem("wallet_2_balance")
  ) {
    sessionStorage.setItem("wallet_1_balance", "830.00");
    sessionStorage.setItem("wallet_2_balance", "750.00");
  }

  const { worker } = require("./mocks/browser");
  await worker.start({
    serviceWorker: {
      url: "/demo-react-app/mockServiceWorker.js",
    },
  });

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

main();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
