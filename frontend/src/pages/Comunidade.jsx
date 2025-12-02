import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Comunidade.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export default function Comunidade() {
  const [posts, setPosts] = useState([]);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novoTexto, setNovoTexto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/posts").then((response) => setPosts(response.data));
  }, []);

  async function criarPost() {
    if (!novoTitulo.trim() || !novoTexto.trim()) return;

    const user = JSON.parse(localStorage.getItem("user"));

    const payload = {
      title: novoTitulo,
      posttext: novoTexto,
      username: user ? user.username : "Anônimo",
    };

    try {
      const response = await api.post("/posts", payload);
      setPosts([response.data, ...posts]);
      setNovoTitulo("");
      setNovoTexto("");
    } catch (err) {
      console.error("Erro ao criar post:", err);
    }
  }

  return (
    <div className="comu-container">

      {/* Criar Post */}
      <div className="create-card">
        <h2>Criar Post</h2>
        <input
          type="text"
          placeholder="Título..."
          value={novoTitulo}
          onChange={(e) => setNovoTitulo(e.target.value)}
        />
        <textarea
          placeholder="Escreva algo..."
          value={novoTexto}
          onChange={(e) => setNovoTexto(e.target.value)}
        ></textarea>
        <button onClick={criarPost}>Postar</button>
      </div>

      {/* Feed */}
      {posts.map((post) => (
        <div
          key={post._id}
          className="post-card"
          onClick={() => navigate(`/post/${post._id}`)}
        >
          <h3>{post.title}</h3>
          <p className="post-author">
            @{post.username} · {dayjs(post.createdAt).fromNow()}
          </p>
          <p className="post-text">{post.posttext}</p>
        </div>
      ))}
    </div>
  );
}
