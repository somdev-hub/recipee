import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Basket from "./pages/Basket/Basket";
import Favorites from "./pages/Favorites/Favorites";
import Community from "./pages/Community/Community";
import Settings from "./pages/Settings/Settings";

function App() {
  const [theme, setTheme] = React.useState("light");
  return (
    <React.Fragment data-theme={theme} id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/favourites" element={<Favorites />} />
          <Route path="/community" element={<Community />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
