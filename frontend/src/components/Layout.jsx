import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Layout.css'; // 👈 Import do CSS

export default function Layout({ children }) {
  return (
    <div className="layout-container"> {/* 👈 Container principal */}
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}