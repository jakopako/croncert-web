import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contribute from "./components/Contribute";
import Search from "./components/Search";
import Status from "./components/Status";
import NotificationActivation from "./components/NotificationActivation";
import NotificationDeletion from "./components/NotificationDeletion";

const baseUrlFromEnv: string = process.env.REACT_APP_CONCERT_API_URL || "";
const emailStringFromEnv: string = process.env.REACT_APP_FEEDBACK_EMAIL || "";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search baseUrlFromEnv={baseUrlFromEnv} />} />
        <Route
          path="/contribute"
          element={
            <Contribute
              baseUrlFromEnv={baseUrlFromEnv}
              emailStringFromEnv={emailStringFromEnv}
            />
          }
        />
        <Route
          path="/status"
          element={<Status baseUrlFromEnv={baseUrlFromEnv} />}
        />
        <Route
          path="/activate-notification"
          element={<NotificationActivation baseUrlFromEnv={baseUrlFromEnv} />}
        />
        <Route
          path="/unsubscribe-notification"
          element={<NotificationDeletion baseUrlFromEnv={baseUrlFromEnv} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
