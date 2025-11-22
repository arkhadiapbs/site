import React, { useState } from "react";
import videoFundo from "../assets/fundo-gamer.mp4";
import "./Register.css";

export default function Register() {  
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (senha !== confirmar) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Conta criada com sucesso!");
        window.location.href = "/login";
      } else {
        alert(data.message || "Erro ao registrar");
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor");
      console.error(err);
    }
  };

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

          <form className="register-form" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="password-field">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <span
                className="toggle-eye"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? "🙈" : "👁️"}
              </span>
            </div>

            <div className="password-field">
              <input
                type={mostrarConfirmar ? "text" : "password"}
                placeholder="Confirmar senha"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
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
