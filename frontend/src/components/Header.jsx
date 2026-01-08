import React, { useEffect, useState } from "react";
import "./Header.css";
import { FaHome, FaGamepad, FaUsers, FaStore } from "react-icons/fa";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Pega usuário do localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const handleLogout = () => {
  localStorage.removeItem("user"); // limpa o usuário
  setUser(null); // atualiza o estado pra remover o botão
  window.location.href = "/login"; // redireciona pra login
};


  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo-container">
        <img src="/assets/logo.png" alt="Logo Arkhadia" className="logo" />
        <div className="logo-text">
          <span className="logo-title">ARKHADIA</span>
        </div>
      </div>

      <nav>
        <a href="/">
          <FaHome /> Home
        </a>
        <a href="/jogos">
          <FaGamepad /> Jogos
        </a>
        <a href="/comunidade">
          <FaUsers /> Comunidade
        </a>
        <a href="/marketplace">
          <FaStore /> Marketplace
        </a>

        {/* Botão Sair só aparece se estiver logado */}
       {user && (
          <a onClick={handleLogout} className="logout-link" style={{ cursor: "pointer" }}>
            Sair
          </a>
        )}

      </nav>
    </header>
  );
}