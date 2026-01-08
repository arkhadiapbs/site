import { useEffect, useState } from "react"; 
import api from "../services/api";
import { FaArrowLeft } from "react-icons/fa";
import "./Carrinho.css";

export default function Carrinho() {
  const [cart, setCart] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;

    api.get(`http://localhost:5000/api/cart/${userId}`)
      .then(res => setCart(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  function remover(productId) {
    api.delete("/api/cart/remove", {
      data: { userId, productId }
    }).then(() => {
      setCart(prev => ({
        ...prev,
        items: prev.items.filter(item => item.product._id !== productId)
      }));
    });
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="carrinho-page">
        <button className="btn-voltar" onClick={() => window.location.href = "/marketplace"}>
          <FaArrowLeft /> Continuar Comprando
        </button>
        <p className="carrinho-vazio">🛒 Seu carrinho está vazio!</p>
      </div>
    );
  }

  const total = cart.items.reduce((acc, item) => acc + item.product.preco * item.quantidade, 0);

  return (
    <div className="carrinho-page">
      <button className="btn-voltar" onClick={() => window.location.href = "/marketplace"}>
        <FaArrowLeft /> Continuar Comprando
      </button>

      <h1 className="carrinho-title">Meu Carrinho</h1>

      <div className="carrinho-lista">
        {cart.items.map(item => (
          <div key={item.product._id} className="carrinho-item">
            <div className="carrinho-info">
              <p><strong>{item.product.nome}</strong></p>
              <p>Qtd: {item.quantidade}</p>
              <p className="carrinho-preco">
                R$ {(item.product.preco * item.quantidade).toFixed(2)}
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

      <div className="carrinho-total">
        <strong>Total:</strong> R$ {total.toFixed(2)}
      </div>

      <button className="btn-comprar">
        Finalizar Compra
      </button>
    </div>
  );
}