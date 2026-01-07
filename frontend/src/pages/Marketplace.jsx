import axios from "axios";
import { useState, useEffect } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import "./Marketplace.css";

export default function Marketplace() {
  const [produtos, setProdutos] = useState([]);
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [marca, setMarca] = useState("Todas");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then(res => {
        console.log("Produtos recebidos:", res.data.produtos);
        setProdutos(res.data.produtos);
      })
      .catch(err => {
        console.error("Erro ao buscar produtos:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const adicionarAoCarrinho = async (productId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Você precisa estar logado");
      return;
    }

    await axios.post("http://localhost:5000/api/cart/add", {
      userId: user._id,
      productId,
    });

    alert("Produto adicionado ao carrinho!");
  } catch (error) {
    console.error(error);
    alert("Erro ao adicionar ao carrinho");
  }
};

  const produtosFiltrados = produtos.filter(prod => {
    const matchNome = prod.nome.toLowerCase().includes(search.toLowerCase());
    const matchCategoria =
      categoria === "Todas" || prod.categoria === categoria;
    const matchMarca = marca === "Todas" || prod.marca === marca;

    return matchNome && matchCategoria && matchMarca;
  });

  if (loading) {
    return <p style={{ padding: 20 }}>Carregando produtos...</p>;
  }

  return (
    <div className="marketplace-container">
      {/* HEADER */}
      <header className="marketplace-header">
        <h1>
          Mercado <span>Gamer</span>
        </h1>
        <p>Encontre os melhores periféricos e equipamentos para seu setup</p>

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
          <div key={prod._id} className="product-card">
            <img src={prod.imagem} alt={prod.nome} />

            <div className="product-info">
              <h3>{prod.nome}</h3>
              <span className="marca">{prod.marca}</span>
              <strong>R$ {prod.preco.toFixed(2)}</strong>

              <button onClick={() => adicionarAoCarrinho(prod._id)}>
  Adicionar ao carrinho
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
