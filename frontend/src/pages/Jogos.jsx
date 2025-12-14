import { useEffect, useState } from "react";
import { FiSearch, FiFilter, FiChevronDown } from "react-icons/fi";
import axios from "axios";
import "./Jogos.css";
import { useRef } from "react";

export default function Jogos() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [genero, setGenero] = useState("Todos");
  const [plataforma, setPlataforma] = useState("Todas");
  const [selectedGame, setSelectedGame] = useState(null);
  const filtroRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/games")
      .then(res => setGames(res.data))
      .catch(err => console.error(err));
  }, []);

  const gamesFiltrados = games.filter(game => {
    const nomeMatch = game.nome.toLowerCase().includes(search.toLowerCase());
    const generoMatch = genero === "Todos" || game.genero === genero;
    const plataformaMatch = plataforma === "Todas" || game.plataforma?.includes(plataforma);

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

      {/* Barra de busca + filtros */}
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
          <select ref={filtroRef}>
            <option value="Todos">Todos os Gêneros</option>
            <option value="RPG">RPG</option>
            <option value="Action RPG">Action RPG</option>
            <option value="Action-Adventure">Action-Adventure</option>
            <option value="FPS">FPS</option>
          </select>
            <FiChevronDown className="filtro-icon" />
        </div>

        <div className="filtro">
          <select value={plataforma} onChange={e => setPlataforma(e.target.value)}>
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

      <p className="contador">{gamesFiltrados.length} jogo(s) encontrado(s)</p>

      {/* Grid de jogos */}
      <div className="jogos-grid">
        {gamesFiltrados.map(game => (
          <div
            key={game._id}
            className="game-card"
            onClick={() => setSelectedGame(game)}
          >
            <img src={game.imagem} alt={game.nome} />
            <h3>{game.nome}</h3>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedGame && (
        <div className="modal-overlay" onClick={() => setSelectedGame(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{selectedGame.nome}</h2>
            <p>{selectedGame.descricao}</p>

            <div className="requisitos">
              <h4>Requisitos mínimos</h4>
              <p>{selectedGame.requisitos.minimo}</p>

              <h4>Requisitos recomendados</h4>
              <p>{selectedGame.requisitos.recomendado}</p>
            </div>

            <button onClick={() => setSelectedGame(null)}>Fechar</button>
          </div>
        </div>
      )}
  </div>
    </div>
  );
}
