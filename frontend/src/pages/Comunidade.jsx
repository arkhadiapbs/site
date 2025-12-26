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
  const [comentarios, setComentarios] = useState({});
  const [novoComentario, setNovoComentario] = useState({});

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
    if (!user?._id) return alert("Faça login pra postar!");

    try {
      const response = await api.post("/api/posts", {
        texto: novoTexto,
        userId: user._id,
      });

      setPosts([response.data, ...posts]);
      setNovoTexto("");
    } catch (err) {
      console.error("Erro ao criar post:", err);
    }
  }

  async function curtirPost(postId) {
    if (!user?._id) return alert("Faça login pra curtir!");

    try {
      const response = await api.post(
        `/api/posts/${postId}/like`,
        { userId: user._id }
      );

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? response.data : post
        )
      );
    } catch (err) {
      console.error("Erro ao curtir post:", err);
    }
  }

  async function carregarComentarios(postId) {
    try {
      const response = await api.get(`/api/comments/${postId}`);
      setComentarios((prev) => ({
        ...prev,
        [postId]: response.data,
      }));
    } catch (err) {
      console.error("Erro ao buscar comentários:", err);
    }
  }

  async function comentarPost(postId) {
    const texto = novoComentario[postId];
    if (!texto?.trim()) return;
    if (!user?._id) return alert("Faça login pra comentar!");

    try {
      await api.post("/api/comments", {
        texto,
        postId,
        userId: user._id,
      });

      setNovoComentario((prev) => ({
        ...prev,
        [postId]: "",
      }));

      carregarComentarios(postId);
    } catch (err) {
      console.error("Erro ao comentar:", err);
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

      {!user && (
        <div className="login-cta">
          <p>Faça login para criar postagens e interagir com a comunidade</p>
          <button onClick={() => navigate("/login")}>Entrar</button>
        </div>
      )}

      {user && (
        <div className="create-card">
          <h2>Criar Post</h2>

          <textarea
            placeholder="Escreva algo..."
            value={novoTexto}
            maxLength={280}
            onChange={(e) => setNovoTexto(e.target.value)}
          />

          <div className="create-footer">
            <span
              className={`char-count ${
                novoTexto.length >= 280
                  ? "danger"
                  : novoTexto.length >= 240
                  ? "warning"
                  : ""
              }`}
            >
              {novoTexto.length}/280
            </span>

            <button
              onClick={criarPost}
              disabled={!novoTexto.trim()}
            >
              Postar
            </button>
          </div>
        </div>
      )}

      {posts.map((post) => {
        const jaCurtiu = post.likes?.includes(user?._id);

        return (
          <div key={post._id} className="post-card">
            <div className="post-header">
              <div className="post-avatar">
                {post.userId?.nome?.[0]?.toUpperCase() || "U"}
              </div>

              <div className="post-author-info">
                <span className="post-user">
                  {post.userId?.nome || "Usuário"}
                </span>
                <span className="post-time">
                  {dayjs(post.createdAt).fromNow()}
                </span>
              </div>
            </div>

            <p className="post-text">{post.texto}</p>

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
                onClick={() => {
                  setComentariosAbertos(
                    comentariosAbertos === post._id ? null : post._id
                  );
                  carregarComentarios(post._id);
                }}
              >
                <FaComment />
              </button>
            </div>

            {comentariosAbertos === post._id && (
              <div className="comments-section">
                {user && (
                  <div className="comment-input">
                    <input
                      type="text"
                      placeholder="Escreva um comentário..."
                      value={novoComentario[post._id] || ""}
                      onChange={(e) =>
                        setNovoComentario((prev) => ({
                          ...prev,
                          [post._id]: e.target.value,
                        }))
                      }
                    />
                    <button onClick={() => comentarPost(post._id)}>
                      Enviar
                    </button>
                  </div>
                )}

                {comentarios[post._id]?.length > 0 ? (
                  comentarios[post._id].map((c) => (
                    <div key={c._id} className="comment">
                      <div className="comment-avatar">
                        {c.userId?.nome?.[0]?.toUpperCase() || "U"}
                      </div>

                      <div className="comment-body">
                        <div className="comment-header">
                          <span className="comment-user">
                            {c.userId?.nome || "Usuário"}
                          </span>
                          <span className="comment-time">
                            {dayjs(c.createdAt).fromNow()}
                          </span>
                        </div>

                        <p className="comment-text">{c.texto}</p>
                      </div>
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