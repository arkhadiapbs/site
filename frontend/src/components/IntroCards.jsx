import "./IntroCards.css";
import { FaGamepad, FaStore, FaUsers, FaStar } from "react-icons/fa";

export default function IntroCards() {
  return (
    <section className="intro-cards">
         <div className="intro-header">
             <h2 className="section-title">
              <span className="title-small">Explore o</span>{" "}
              <span className="title-highlight">Arkhadia</span>
            </h2>
         </div>

      <div className="cards-container">

        <div className="card">
          <FaGamepad className="card-icon" />
          <h3>Explorar Jogos</h3>
          <p>Descubra jogos incríveis de todos os estilos e plataformas.</p>
        </div>

        <div className="card">
          <FaStore className="card-icon" />
          <h3>Marketplace</h3>
          <p>Compre, venda e troque itens com outros jogadores.</p>
        </div>

        <div className="card">
          <FaUsers className="card-icon" />
          <h3>Comunidade</h3>
          <p>Conecte-se com outros gamers e forme sua crew.</p>
        </div>

        <div className="card">
          <FaStar className="card-icon" />
          <h3>Recomendações</h3>
          <p>Jogos escolhidos com base no seu estilo de gameplay.</p>
        </div>

      </div>
    </section>
  );
}