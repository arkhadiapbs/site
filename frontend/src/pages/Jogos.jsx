import React, { useEffect, useState } from "react";
import "./Jogos.css";

export default function Jogos() {
  const [games, setGames] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const [minimo, setMinimo] = useState("");
  const [recomendado, setRecomendado] = useState("");

  // ✅ BUSCAR JOGOS
  useEffect(() => {
    fetch("http://localhost:5000/games")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGames(data);
        } else if (Array.isArray(data.games)) {
          setGames(data.games);
        } else {
          setGames([]);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar games:", err);
        setGames([]);
      });
  }, []);

  // ✅ CRIAR JOGO
  async function criarGame(e) {
    e.preventDefault();

    if (!nome || !descricao || !minimo || !recomendado) {
      alert("Preenche tudo direitinho 👀");
      return;
    }

    const novoGame = {
      nome,
      descricao,
      imagem,
      requisitos: {
        minimo,
        recomendado,
      },
    };

    try {
      const response = await fetch("http://localhost:5000/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoGame),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Erro ao cadastrar jogo");
        return;
      }

      setGames((prev) => [...prev, data.game]);

      setNome("");
      setDescricao("");
      setImagem("");
      setMinimo("");
      setRecomendado("");
    } catch (err) {
      console.error("Erro ao criar jogo:", err);
    }
  }

  return (
    <div className="games-container">

      <h1 className="games-title">🎮 Jogos em Destaque</h1>

      {/* ✅ FORMULÁRIO (se quiser depois a gente esconde com admin) */}
      <form className="game-form" onSubmit={criarGame}>
        <input
          type="text"
          placeholder="Nome do jogo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="URL da imagem"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
        />

        <textarea
          placeholder="Descrição do jogo"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        ></textarea>

        <input
          type="text"
          placeholder="Requisitos mínimos"
          value={minimo}
          onChange={(e) => setMinimo(e.target.value)}
        />

        <input
          type="text"
          placeholder="Requisitos recomendados"
          value={recomendado}
          onChange={(e) => setRecomendado(e.target.value)}
        />

        <button type="submit">Cadastrar Jogo</button>
      </form>

      {/* ✅ VITRINE DE JOGOS */}
      <div className="games-grid">
        {Array.isArray(games) && games.length > 0 ? (
          games.map((game) => (
            <div className="game-card" key={game._id}>

              <div className="game-image">
                {game.imagem ? (
                  <img src={game.imagem} alt={game.nome} />
                ) : (
                  <div className="no-image">Sem imagem</div>
                )}
              </div>

              <div className="game-info">
                <h2>{game.nome}</h2>
                <p className="game-desc">{game.descricao}</p>

                <div className="game-req">
                  <p><strong>Mínimo:</strong> {game.requisitos?.minimo}</p>
                  <p><strong>Recomendado:</strong> {game.requisitos?.recomendado}</p>
                </div>
              </div>

            </div>
          ))
        ) : (
          <p className="no-games">Nenhum jogo cadastrado ainda 😢</p>
        )}
      </div>

    </div>
  );
}