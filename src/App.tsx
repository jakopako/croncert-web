import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contribute from "./components/Contribute";
import { SearchPage } from "./components/SearchPage";

const baseUrlFromEnv: string = process.env.REACT_APP_CONCERT_API_URL || "";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<SearchPage baseUrlFromEnv={baseUrlFromEnv} />}
        />
        <Route
          path="/contribute"
          element={<Contribute baseUrlFromEnv={baseUrlFromEnv} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
