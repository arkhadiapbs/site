import { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import "./Marketplace.css";

const produtosMock = [
  {
    id: 1,
    nome: "Teclado Mecânico RGB",
    categoria: "Teclado",
    marca: "Redragon",
    preco: 299.9,
    imagem: "https://via.placeholder.com/400x300?text=Teclado+RGB",
  },
  {
    id: 2,
    nome: "Mouse Gamer RGB",
    categoria: "Mouse",
    marca: "Logitech",
    preco: 199.9,
    imagem: "https://via.placeholder.com/400x300?text=Mouse+Gamer",
  },
  {
    id: 3,
    nome: "Headset Gamer",
    categoria: "Headset",
    marca: "HyperX",
    preco: 399.9,
    imagem: "https://via.placeholder.com/400x300?text=Headset",
  },
];

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [marca, setMarca] = useState("Todas");

  const produtosFiltrados = produtosMock.filter(prod => {
    const matchNome = prod.nome.toLowerCase().includes(search.toLowerCase());
    const matchCategoria =
      categoria === "Todas" || prod.categoria === categoria;
    const matchMarca = marca === "Todas" || prod.marca === marca;

    return matchNome && matchCategoria && matchMarca;
  });

  return (
    <div className="marketplace-container">
      {/* HEADER */}
      <header className="marketplace-header">
        <h1>
          Mercado <span>Gamer</span>
        </h1>
        <p>
          Encontre os melhores periféricos e equipamentos para seu setup
        </p>

        {/* BUSCA */}
        <div className="search-bar">
          <FiSearch />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* FILTROS */}
        <div className="filters">
          <FiFilter className="filter-icon" />

          <select value={categoria} onChange={e => setCategoria(e.target.value)}>
            <option value="Todas">Todas Categorias</option>
            <option value="Teclado">Teclado</option>
            <option value="Mouse">Mouse</option>
            <option value="Headset">Headset</option>
          </select>

          <select value={marca} onChange={e => setMarca(e.target.value)}>
            <option value="Todas">Todas Marcas</option>
            <option value="Redragon">Redragon</option>
            <option value="Logitech">Logitech</option>
            <option value="HyperX">HyperX</option>
          </select>
        </div>
      </header>

      <p className="contador">
        {produtosFiltrados.length} produto(s) encontrado(s)
      </p>

      {/* GRID */}
      <div className="products-grid">
        {produtosFiltrados.map(prod => (
          <div key={prod.id} className="product-card">
            <img src={prod.imagem} alt={prod.nome} />

            <div className="product-info">
              <h3>{prod.nome}</h3>
              <span className="marca">{prod.marca}</span>
              <strong>R$ {prod.preco.toFixed(2)}</strong>

              <button>Ver produto</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}