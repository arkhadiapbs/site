import React, { useEffect, useState } from "react";
import "./Header.css";

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
          <span className="logo-subtitle">SEU MUNDO GAME</span>
        </div>
      </div>
      <nav>
        <a href="/">Home</a>
        <a href="/comunidade">Comunidade</a>
        <a href="/marketplace">Marketplace</a>
      </nav>
    </header>
  );
}