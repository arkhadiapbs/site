import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "./Comunidade.css";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    api.get(`/posts/${id}`).then((res) => setPost(res.data));
    api.get(`/api/comments/${id}`).then((res) => setComments(res.data));
  }, [id]);

  async function enviarComentario() {
    if (!newComment.trim()) return;

    const payload = {
      commentBody: newComment,
      PostId: id,
      username: user ? user.username : "Anônimo",
    };

    try {
      const res = await api.post("/api/comments", payload);
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="postPage-container">
      <div className="postPage-card">
        <h2>{post.title}</h2>
        <p>{post.posttext}</p>
        <span className="postPage-author">
          Postado por @{post.username}
        </span>
      </div>

      <div className="comments-card">
        <h3>Comentários</h3>

        <div className="comment-input">
          <input
            type="text"
            placeholder="Digite um comentário..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={enviarComentario}>Enviar</button>
        </div>

        <div className="comments-list">
          {comments.map((c) => (
            <div className="comment-item" key={c._id || Math.random()}>
              <p>{c.commentBody || c.text}</p>
              <small>@{c.username}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}