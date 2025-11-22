const express = require("express");
const Comment = require("../models/Comment");
const Post = require("../models/post");

const router = express.Router();

// =======================
// 🔹 1. Criar comentário
// =======================
router.post("/", async (req, res) => {
  const { texto, postId, userId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post não encontrado" });

    const comment = new Comment({ texto, postId, userId });
    await comment.save();

    res.status(201).json({ message: "Comentário criado!", comment });
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar comentário", err });
  }
});

// =======================
// 🔹 2. Listar comentários de um post
// =======================
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar comentários", err });
  }
});

// =======================
// 🔹 3. Editar comentário
// =======================
router.put("/:id/:userId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment)
      return res.status(404).json({ message: "Comentário não encontrado" });

    if (comment.userId.toString() !== req.params.userId)
      return res.status(403).json({ message: "Você não pode editar este comentário" });

    comment.texto = req.body.texto || comment.texto;
    await comment.save();

    res.status(200).json({ message: "Comentário atualizado", comment });
  } catch (err) {
    res.status(500).json({ message: "Erro ao editar comentário", err });
  }
});

// =======================
// 🔹 4. Deletar comentário
// =======================
router.delete("/:id/:userId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment)
      return res.status(404).json({ message: "Comentário não encontrado" });

    if (comment.userId.toString() !== req.params.userId)
      return res.status(403).json({ message: "Você não pode deletar este comentário" });

    await comment.deleteOne();

    res.status(200).json({ message: "Comentário deletado" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar", err });
  }
});

module.exports = router;
