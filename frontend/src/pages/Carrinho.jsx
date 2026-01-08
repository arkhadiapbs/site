import { useEffect, useState } from "react";
import api from "../services/api";
import "./Carrinho.css";

export default function Carrinho() {
  const [cart, setCart] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

useEffect(() => {
  if (!userId) return;

  api.get(`/cart/${userId}`)
    .then(res => setCart(res.data))
    .catch(err => console.error(err));
}, [userId]);

if (!cart || cart.items.length === 0) {
  return <p className="carrinho-vazio">🛒 Carrinho vazio</p>;
}

  function remover(productId) {
  api.delete("/cart/remove", {
    data: { userId, productId }
  }).then(() => {
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(
        item => item.product._id !== productId
      )
    }));
  });
}

  return (
<div className="carrinho-page">
  <h1 className="carrinho-title">Meu Carrinho</h1>

  <div className="carrinho-lista">
    {cart.items.map(item => (
      <div key={item.product._id} className="carrinho-item">
        
        <div className="carrinho-info">
          <p><strong>{item.product.nome}</strong></p>
          <p>Qtd: {item.quantidade}</p>
          <p className="carrinho-preco">
            R$ {item.product.preco}
          </p>
        </div>

        <div className="carrinho-actions">
          <button onClick={() => remover(item.product._id)}>
            Remover
          </button>
        </div>

      </div>
    ))}
  </div>
</div>
  );
}