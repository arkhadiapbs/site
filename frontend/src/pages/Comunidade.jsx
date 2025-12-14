import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Comunidade.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export default function Comunidade() {
  const [posts, setPosts] = useState([]);
  const [novoTexto, setNovoTexto] = useState("");
  const [comentariosAbertos, setComentariosAbertos] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

useEffect(() => {
  async function carregarFeed() {
    try {
      const response = await api.get("/api/posts/feed");
      setPosts(response.data);
    } catch (err) {
      console.error("Erro ao carregar feed:", err);
    }
  }

  carregarFeed();
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

  async function curtirPost(postId) {
    if (!user?._id) return alert("Faça login pra curtir!");

    try {
      const response = await api.post(`/api/posts/${postId}/like`, {
        userId: user._id,
      });

      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? response.data : post))
      );
    } catch (err) {
      console.error("Erro ao curtir post:", err);
    }
  }

  return (
    <div className="comu-container">
      {/* HEADER */}
      <section className="com-header">
        <h1 className="com-title">
          <span className="title-highlight">Comunidade</span>{" "}
          <span className="title-small">Gamer</span>
        </h1>
        <p className="com-subtitle">
          Conecte-se com outros gamers e compartilhe suas experiências
        </p>
      </section>

      {/* CTA LOGIN */}
      {!user && (
        <div className="login-cta">
          <p>Faça login para criar postagens e interagir com a comunidade</p>
          <button onClick={() => navigate("/login")}>Entrar</button>
 
        </div>
      )}

      {/* CRIAR POST */}
      {user && (
        <div className="create-card">
          <h2>Criar Post</h2>
          <textarea
            placeholder="Escreva algo..."
            value={novoTexto}
            onChange={(e) => setNovoTexto(e.target.value)}
          />
          <button onClick={criarPost} disabled={!novoTexto.trim()}>
            Postar
          </button>
        </div>
      )}

      {/* POSTS */}
      {posts.map((post) => {
        const jaCurtiu = post.likes?.includes(user?._id);

        return (
          <div key={post._id} className="post-card">
            <div
              className="post-author"
              data-avatar={post.userId?.nome?.[0] || "U"}
            >
              @{post.userId?.nome || "Usuário"} ·{" "}
              {dayjs(post.createdAt).fromNow()}
            </div>

            <p className="post-text">{post.texto}</p>

            {post.imagem && (
              <img
                src={post.imagem}
                alt="Imagem do post"
                className="post-image"
              />
            )}

            <div className="post-actions">
              <button
                className={`like-btn ${jaCurtiu ? "liked" : ""}`}
                onClick={() => curtirPost(post._id)}
              >
                {jaCurtiu ? <FaHeart /> : <FaRegHeart />}
                <span>{post.likes?.length || 0}</span>
              </button>

              <button
                className="comment-btn"
                onClick={() =>
                  setComentariosAbertos(
                    comentariosAbertos === post._id ? null : post._id
                  )
                }
              >
                <FaComment />
                <span>{post.comentarios?.length || 0}</span>
              </button>
            </div>

            {/* COMENTÁRIOS */}
            {comentariosAbertos === post._id && (
              <div className="comments-section">
                {post.comentarios?.length > 0 ? (
                  post.comentarios.map((comentario) => (
                    <div key={comentario._id} className="comment">
                      <strong>@{comentario.userId?.nome}</strong>
                      <p>{comentario.texto}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-comments">
                    Ainda não há comentários
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}