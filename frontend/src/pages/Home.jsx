import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import videoFundo from "../assets/fundo-gamer.mp4";
import galaxia from "../assets/galaxia.jpg";

export default function Home() {
  const [isVisible, setIsVisible] = useState({});
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observers = [];

    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [index]: true }));
            }
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

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="home">

      {/* INTRO COM VÍDEO NO FUNDO */}
      <section className="intro fade-in">
        <div className="intro-video-container">
          <video autoPlay loop muted playsInline className="intro-video">
            <source src={videoFundo} type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>

        <div className="intro-text">
          <h1 className="glitch-text">Bem-vindo ao Arkhadia 🎮</h1>
          <h2 className="slide-up delay-1">O multiverso gamer onde tudo acontece.</h2>
          <p className="slide-up delay-2">
            Aqui você descobre jogos, cria conexões e entra no universo mais 
            insano da comunidade gamer.
          </p>
        </div>
      </section>

      {/* SOBRE JOGOS */}
      <section 
        ref={addToRefs}
        className={`zigzag ${isVisible[0] ? 'visible' : ''}`}
      >
        <div className="text slide-left">
          <h3>Descubra Novos Jogos</h3>
          <p>
            Explore títulos famosos, indies promissores e recomendações feitas 
            especialmente para o seu estilo de jogo.
          </p>
        </div>
        <div className="image slide-right">
          <div className="image-wrapper">
            <img src={galaxia} alt="Galáxia gamer" />
          </div>
        </div>
      </section>

      {/* SOBRE A COMUNIDADE */}
      <section 
        ref={addToRefs}
        className={`zigzag reverse ${isVisible[1] ? 'visible' : ''}`}
      >
        <div className="text slide-right">
          <h3>Entre na Comunidade</h3>
          <p>
            Participe de grupos, troque ideias, encontre players para jogar e 
            faça parte de um ambiente feito por gamers e para gamers.
          </p>
        </div>
        <div className="image slide-left">
          <div className="image-wrapper">
            <img src={galaxia} alt="Comunidade gamer" />
          </div>
        </div>
      </section>

      {/* EVENTOS / TORNEIOS */}
      <section 
        ref={addToRefs}
        className={`zigzag ${isVisible[2] ? 'visible' : ''}`}
      >
        <div className="text slide-left">
          <h3>Torneios e Eventos</h3>
          <p>
            Fique por dentro dos campeonatos da plataforma, participe de 
            desafios e mostre seu nível para o mundo.
          </p>
        </div>
        <div className="image slide-right">
          <div className="image-wrapper">
            <img src={galaxia} alt="Eventos gamer" />
          </div>
        </div>
      </section>

    </div>
  );
}