const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// Criar post
router.post("/", async (req, res) => {
  try {
    const { texto, userId } = req.body;

    const novoPost = new Post({ texto, userId });
    await novoPost.save();

    res.status(201).json(novoPost);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar post" });
  }
});

// Listar posts
router.get("/feed", async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "nome email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar posts" });
  }
});

// EDITAR POST
router.put("/:id/:userId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    // Garante que só o dono pode editar
    if (post.userId.toString() !== req.params.userId) {
      return res.status(403).json({ message: "Você não pode editar este post" });
    }

    // Atualiza o conteúdo
    post.texto = req.body.texto || post.texto;

    await post.save();

    res.status(200).json({ message: "Post atualizado", post });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error });
  }
});

//rota delete
router.delete("/:id/:userId", async (req, res) => {
  try {
    const { id, userId } = req.params;

    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ error: "Post não encontrado" });

    if (post.userId.toString() !== userId)
      return res.status(403).json({ error: "Não autorizado" });

    await post.deleteOne();

    res.json({ message: "Post deletado" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar post" });
  }
});

//rota para curtir post
router.post("/:id/like", async (req, res) => {
  try {
    const { userId } = req.body;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    const jaCurtiu = post.likes.some(
      (id) => id.toString() === userId
    );

    if (jaCurtiu) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    // 🔥 BUSCA DE NOVO COM POPULATE
    const postAtualizado = await Post.findById(postId)
      .populate("userId", "nome email");

    res.json(postAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao curtir post" });
  }
});


module.exports = router;
