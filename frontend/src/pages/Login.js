import React from "react";
import fundoGamer from '../assets/fundo-gamer.png';
import "./Login.css";

export default function Login() {
  return (
  
  <div className="login-container">
    <div
      className="login-bg"
      style={{
        backgroundImage: `url(${fundoGamer})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -2
      }}
    />
    <div className="overlay"></div>

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