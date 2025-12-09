import React, { useState } from "react";
import videoFundo from "../assets/fundo-gamer.mp4"; 
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [erroEmail, setErroEmail] = useState("");

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

async function handleSubmit(e) {
  e.preventDefault();

  if (!validarEmail(email)) {
    setErroEmail("Digite um e-mail válido.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Erro no login");
      return;
    }

    // ✅ SALVA O USUÁRIO NO LOCALSTORAGE
    localStorage.setItem("user", JSON.stringify(data.user));

    console.log("Usuário logado:", data.user);

    // ✅ REDIRECIONA PRA COMUNIDADE
    window.location.href = "/Comunidade";

  } catch (error) {
    console.error("Erro no login:", error);
    alert("Erro ao conectar com o servidor");
  }
}

  return (
    <div className="login-container">
      <video autoPlay loop muted playsInline className="video-background">
        <source src={videoFundo} type="video/mp4" />
      </video>

      <div className="overlay"></div>

      <div className="login-box">
        <div className="logo-side">
          <img src="/assets/logo.png" alt="Logo" className="login-logo" />
        </div>

        <div className="form-side">
          <h1 className="login-title">ENTRAR</h1>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            
            {/* CAMPO DE E-MAIL */}
            <div className="mb-3">
              <input
                type="email"
                className={`form-control ${erroEmail ? "is-invalid" : ""}`}
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {erroEmail && (
                <div className="invalid-feedback">
                  {erroEmail}
                </div>
              )}
            </div>

            {/* SENHA */}
            <div className="mb-3">
              <input 
                type="password" 
                className="form-control" 
                placeholder="Senha" 
              />
            </div>

            <p className="login-text">
              <a href="/Register">Crie uma conta</a> para acesso completo, ou entre como{" "}
              <a href="/Comunidade">visitante</a>.
            </p>

            <button type="submit" className="btn btn-primary w-100">
              AVANÇAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}