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
  const [novoTexto, setNovoTexto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/posts/feed").then((response) => setPosts(response.data));
  }, []);

  async function criarPost() {
    if (!novoTexto.trim()) return;

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?._id) {
      alert("Você precisa estar logado pra postar!");
      return;
    }

    const payload = {
      texto: novoTexto,
      userId: user._id,
    };

    try {
      const response = await api.post("/api/posts", payload);
      setPosts([response.data, ...posts]);
      setNovoTexto("");
    } catch (err) {
      console.error("Erro ao criar post:", err);
    }
  }

  return (
    <div className="comu-container">

      <div className="create-card">
        <h2>Criar Post</h2>

        <textarea
          placeholder="Escreva algo..."
          value={novoTexto}
          onChange={(e) => setNovoTexto(e.target.value)}
        ></textarea>

        <button onClick={criarPost}>Postar</button>
      </div>

      {posts.map((post) => (
        <div
          key={post._id}
          className="post-card"
          onClick={() => navigate(`/post/${post._id}`)}
        >
          <p className="post-author">
            @{post.userId?.nome || "Usuário"} · {dayjs(post.createdAt).fromNow()}
          </p>

          <p className="post-text">{post.texto}</p>
        </div>
      ))}
    </div>
  );
}
