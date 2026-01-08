const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

// ➕ ADICIONAR AO CARRINHO
router.post("/add", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantidade: 1 }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (itemIndex >= 0) {
        cart.items[itemIndex].quantidade += 1;
      } else {
        cart.items.push({ product: productId, quantidade: 1 });
      }

      await cart.save();
    }

    res.status(200).json({ message: "Produto adicionado ao carrinho" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao adicionar ao carrinho" });
  }
});

// VER CARRINHO
router.get("/:userId", async (req, res) => {
  const cart = await Cart.findOne({ user: req.params.userId })
    .populate("items.product");

  if (!cart) {
    return res.json({ items: [] });
  }

  res.json(cart);
});

// REMOVER ITEM DO CARRINHO
router.delete("/remove", async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) return res.status(404).end();

  cart.items = cart.items.filter(
    item => item.product.toString() !== productId
  );

  await cart.save();
  res.json({ ok: true });
});

module.exports = router;
