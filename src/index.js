import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import FilterProvider from "./contexts/FilterContext";
import UserPostProvider from "./contexts/UserPostContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SkeletonTheme color="#202020" highlightColor="#444">
      <UserPostProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </UserPostProvider>
    </SkeletonTheme>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
