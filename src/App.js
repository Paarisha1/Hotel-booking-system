import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Lists from "./pages/Lists/Lists";
import Hotel from "./pages/Hotel/Hotel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Lists />} />
        <Route path="/hotels/:id" element={<Hotel/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
