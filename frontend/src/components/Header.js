import React from "react";
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/assets/logo.png" alt="Logo Arkhadia" className="logo" />
      </div>
      <nav>
        <a href="/comunidade">Comunidade</a>
        <a href="/">Home</a>
        <a href="/marketplace">Marketplace</a>
      </nav>
    </header>
  );
}
