import React from "react";
import videoFundo from "../assets/fundo-gamer.mp4"; 
import "./Login.css";

export default function Login() {
  return (
    <div className="login-container">
      {/* Vídeo de fundo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video-background"
      >
        <source src={videoFundo} type="video/mp4" />
      </video>

      {/* Overlay escurecido */}
      <div className="overlay"></div>

      {/* Conteúdo principal */}
      <div className="login-box">
        <div className="logo-side">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="login-logo"
          />
        </div>

        <div className="form-side">
          <h1 className="login-title">ENTRAR</h1>

          <form className="login-form">
            <input type="email" placeholder="E-mail" />
            <input type="password" placeholder="Senha" />
            <p className="login-text">
              <a href="#">Crie uma conta</a> para acesso completo, ou entre como{" "}
              <a href="#">visitante</a>.
            </p>
            <button type="submit">AVANÇAR</button>
          </form>
        </div>
      </div>
    </div>
  );
}