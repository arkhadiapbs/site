import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Jogos from "./pages/Jogos";
import Marketplace from "./pages/Marketplace";
import Comunidade from "./pages/Comunidade";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './styles.css';


function App() {
  return (
    <Router>
      <Header /> {/* aparece em todas as páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jogos" element={<Jogos />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/comunidade" element={<Comunidade />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer /> {/* aparece em todas as páginas */}
    </Router>
  );
}
export default App;