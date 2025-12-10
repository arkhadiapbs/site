import React, { useEffect, useRef } from "react";
import "./Home.css";
import Hero from "../components/Hero";
import IntroCards from "../components/IntroCards";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

export default function Home() {
  const sectionsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const observers = [];

    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {

          });
        },
        { threshold: 0.2 }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);


  return (
    <div className="home">

      {/* HERO NO LUGAR DA INTRO COM VÍDEO */}
      <Hero />

      {/* SOBRE JOGOS */}
      <IntroCards />

     {/* CTA FINAL */}
      <section className="cta">
        <h2 className="cta-title">Pronto para começar sua jornada?</h2>
          <p className="cta-text">
            Junte-se à comunidade Arkhadia e descubra um mundo de possibilidades no universo gamer.
          </p>
        <button className="cta-button" onClick={() => navigate("/comunidade")}>
          <FaUsers /> Entrar na Comunidade
        </button>
      </section>

    </div>
  );
}