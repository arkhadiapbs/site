import React, { useState } from "react";
import videoFundo from "../assets/fundo-gamer.mp4";
import "./Register.css";

export default function Register() {  // Estados pra mostrar/ocultar senha
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  return (
    <div className="register-container">
      <video autoPlay loop muted playsInline className="video-background">
        <source src={videoFundo} type="video/mp4" />
      </video>

      <div className="overlay"></div>

      <div className="register-box">
 
     <div className="logo-side">
       <img src="/assets/logo.png" alt="Logo" className="register-logo" />
     </div>

   <div className="form-side">
     <h1 className="register-title">CRIAR CONTA</h1>
     <form className="register-form">
            <input type="text" placeholder="Nome completo" />
            <input type="email" placeholder="E-mail" />

            {/* Campo Senha */}
            <div className="password-field">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
              />
              <span
                className="toggle-eye"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? "🙈" : "👁️"}
              </span>
            </div>

            {/* Campo Confirmar Senha */}
            <div className="password-field">
              <input
                type={mostrarConfirmar ? "text" : "password"}
                placeholder="Confirmar senha"
              />
              <span
                className="toggle-eye"
                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
              >
                {mostrarConfirmar ? "🙈" : "👁️"}
              </span>
            </div>

            <p className="register-text">
              Já tem uma conta? <a href="/Login">Entre aqui</a>.
            </p>

            <button type="submit">REGISTRAR</button>
          </form>
        </div>
      </div>
    </div>
  );
}