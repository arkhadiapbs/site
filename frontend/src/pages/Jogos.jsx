import { useEffect, useState, useRef } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import axios from "axios";
import "./Jogos.css";

export default function Jogos() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [genero, setGenero] = useState("Todos");
  const [plataforma, setPlataforma] = useState("Todas");
  const [selectedGame, setSelectedGame] = useState(null);
  const filtroRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/games")
      .then(res => setGames(res.data))
      .catch(err => console.error(err));
  }, []);

  const gamesFiltrados = games.filter(game => {
    const nomeMatch = (game.titulo ?? "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const generoMatch =
      genero === "Todos" ||
      game.informacoes?.genero === genero;

    const plataformaMatch =
      plataforma === "Todas" ||
      game.informacoes?.plataforma?.includes(plataforma);

    return nomeMatch && generoMatch && plataformaMatch;
  });

  return (
    <div className="jogos-page">
      <div className="games-container">
        <h1 className="games-title">
          <span className="title-small">Catálogo de</span>{" "}
          <span className="title-highlight">Jogos</span>
        </h1>

        <p className="games-subtitle">
          Descubra os melhores jogos e encontre sua próxima aventura
        </p>

        {/* 🔎 Busca + filtros */}
        <div className="jogos-filtros">
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Buscar jogo..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div
            className="filtro"
            onClick={() => filtroRef.current?.focus()}
          >
            <select
              ref={filtroRef}
              value={genero}
              onChange={e => setGenero(e.target.value)}
            >
              <option value="Todos">Todos os Gêneros</option>
              <option value="RPG">RPG</option>
              <option value="Action RPG">Action RPG</option>
              <option value="Action-Adventure">Action-Adventure</option>
              <option value="FPS">FPS</option>
            </select>
            <FiChevronDown className="filtro-icon" />
          </div>

          <div className="filtro">
            <select
              value={plataforma}
              onChange={e => setPlataforma(e.target.value)}
            >
              <option value="Todas">Todas Plataformas</option>
              <option value="PC">PC</option>
              <option value="PS4">PS4</option>
              <option value="PS5">PS5</option>
              <option value="Xbox">Xbox</option>
              <option value="Switch">Switch</option>
            </select>
            <FiChevronDown className="filtro-icon" />
          </div>
        </div>

        <p className="contador">
          {gamesFiltrados.length} jogo(s) encontrado(s)
        </p>

        {/* 🎮 Grid */}
        <div className="jogos-grid">
          {gamesFiltrados.map(game => (
            <div
              key={game._id}
              className="game-card"
              onClick={() => setSelectedGame(game)}
            >
              <h3>{game.titulo}</h3>
              <p className="game-genero">
                {game.informacoes?.genero}
              </p>
            </div>
          ))}
        </div>

        {/* 🪟 MODAL NOVO */}
        {selectedGame && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedGame(null)}
          >
            <div
              className="game-modal"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setSelectedGame(null)}
              >
                ✕
              </button>

              <h1 className="game-title">
                {selectedGame.titulo}
              </h1>

              <div className="game-content">
                {/* COLUNA ESQUERDA */}
                <div className="game-info">
                  <section>
                    <h3>Enredo</h3>
                    <p>{selectedGame.enredo}</p>
                  </section>

                  <section>
                    <h3>Informações</h3>

                    <div className="info-row">
                      <span>Gênero:</span>
                      <span className="tag">
                        {selectedGame.informacoes?.genero}
                      </span>
                    </div>

                    <div className="info-row">
                      <span>Plataforma:</span>
                      <span>
                        {selectedGame.informacoes?.plataforma?.join(", ")}
                      </span>
                    </div>

                    <div className="info-row">
                      <span>Desenvolvedora:</span>
                      <span>
                        {selectedGame.informacoes?.desenvolvedora}
                      </span>
                    </div>

                    <div className="info-row">
                      <span>Ano:</span>
                      <span>
                        {selectedGame.informacoes?.ano}
                      </span>
                    </div>

                    <div className="info-row">
                      <span>Avaliação:</span>
                      <span className="stars">
                        {"★".repeat(selectedGame.informacoes?.avaliacao || 0)}
                        {"☆".repeat(
                          5 - (selectedGame.informacoes?.avaliacao || 0)
                        )}
                      </span>
                    </div>
                  </section>

                  <section>
                    <h3>Requisitos Mínimos</h3>
                    <p>OS: {selectedGame.requisitosMinimos?.sistemaOperacional}</p>
                    <p>Processador: {selectedGame.requisitosMinimos?.processador}</p>
                    <p>Memória: {selectedGame.requisitosMinimos?.memoria}</p>
                    <p>Placa de Vídeo: {selectedGame.requisitosMinimos?.placaDeVideo}</p>
                    <p>Armazenamento: {selectedGame.requisitosMinimos?.armazenamento}</p>
                  </section>
                </div>

                {/* COLUNA DIREITA */}
                <div className="game-cover">
                  <img
                    src={
                      selectedGame.capa ||
                      "https://via.placeholder.com/400x600?text=Game+Cover"
                    }
                    alt={selectedGame.titulo}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}