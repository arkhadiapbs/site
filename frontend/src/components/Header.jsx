import React, { useEffect, useState } from "react";
import "./Header.css";
import { FaHome, FaGamepad, FaUsers, FaStore } from "react-icons/fa";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo-container">
        <img src="/assets/logo.png" alt="Logo Arkhadia" className="logo" />
        {/* Texto que aparece só quando scrolled */}
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
</nav>

    </header>
  );
}