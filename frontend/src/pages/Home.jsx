import React, { useEffect, useState } from 'react';
import './Home.css';

export default function Home() {
  return (
    <div>
      {/* CONTEÚDO ABAIXO DO HEADER */}
      <section className="intro">
        <div className="intro-text">
          <h1>Bem-vindo ao Arkhadia 🎮</h1>
          <h2>Explore o universo gamer com estilo!</h2>
          <h2>Sobre o Projeto</h2>
          <p>
            Arkhadia é uma plataforma feita pra conectar gamers, compartilhar experiências e
            descobrir novas aventuras.
          </p>
        </div>
      </section>

      <section className="zigzag">
        <div className="text">
          <h3>Explore o Infinito</h3>
          <p>
            Descubra jogos, comunidades e torneios exclusivos criados para você.
          </p>
        </div>
        <div className="image">
          <img src="/imagens/galaxia.jpg" alt="Galáxia gamer" />
        </div>
      </section>
      <section className="zigzag">
        <div className="text">
          <h3>Explore o Infinito</h3>
          <p>
            Descubra jogos, comunidades e torneios exclusivos criados para você.
          </p>
        </div>
        <div className="image">
          <img src="/imagens/galaxia.jpg" alt="Galáxia gamer" />
        </div>
      </section>
      <section className="zigzag">
        <div className="text">
          <h3>Explore o Infinito</h3>
          <p>
            Descubra jogos, comunidades e torneios exclusivos criados para você.
          </p>
        </div>
        <div className="image">
          <img src="/imagens/galaxia.jpg" alt="Galáxia gamer" />
        </div>
      </section>
    </div>
  );
}