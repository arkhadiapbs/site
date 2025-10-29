import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import das páginas
import Home from "./pages/Home";
import Jogos from "./pages/Jogos";
import Marketplace from "./pages/Marketplace";
import Comunidade from "./pages/Comunidade";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Import do Layout (Header + Footer)
import Layout from "./components/Layout";

import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔹 Páginas COM Header e Footer (usam Layout) */}
        <Route 
          path="/" 
          element={
            <Layout>
              <Home />
            </Layout>
          } 
        />
        
        <Route 
          path="/jogos" 
          element={
            <Layout>
              <Jogos />
            </Layout>
          } 
        />
        
        <Route 
          path="/marketplace" 
          element={
            <Layout>
              <Marketplace />
            </Layout>
          } 
        />
        
        <Route 
          path="/comunidade" 
          element={
            <Layout>
              <Comunidade />
            </Layout>
          } 
        />
        
        {/* 🔹 Páginas SEM Header e Footer (não usam Layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;