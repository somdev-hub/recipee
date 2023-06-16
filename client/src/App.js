import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Basket from "./pages/Basket/Basket";
import Favorites from "./pages/Favorites/Favorites";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/favourites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
