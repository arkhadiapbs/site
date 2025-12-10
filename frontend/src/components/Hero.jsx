import "./Hero.css";
import { FaStore, FaGamepad } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>ARKHADIA</h1>
        <p>
          Sua plataforma gamer definitiva. Jogos, periféricos e 
          comunidade em um só lugar.
        </p>

        <div className="hero-buttons">
          <button 
            className="btn-primary"
            onClick={() => navigate("/jogos")}
          >
            <FaGamepad /> Explorar agora
          </button>

          <button 
            className="btn-secondary"
            onClick={() => navigate("/marketplace")}
          >
            <FaStore /> Ver lançamentos
          </button>
        </div>
      </div>
    </section>
  );
}