const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

// ADICIONAR AO CARRINHO
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
      await cart.save(); 
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

    // Retorna o carrinho atualizado
    const updatedCart = await Cart.findOne({ user: userId })
      .populate("items.product");
    
    res.json({ 
      message: "Produto adicionado ao carrinho",
      cart: updatedCart 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao adicionar ao carrinho" });
  }
});

// 🛒 VER CARRINHO 
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId })
      .populate("items.product");

    if (!cart) {
      return res.json({ items: [] }); 
    }

    res.json(cart);
  } catch (error) {
    console.error("ERRO AO BUSCAR CARRINHO:", error);
    res.status(500).json({ message: "Erro ao buscar carrinho" });
  }
});

// REMOVER ITEM DO CARRINHO
router.delete("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Carrinho não encontrado" });

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    await cart.save();
    
    // Retorna o carrinho atualizado
    const updatedCart = await Cart.findOne({ user: userId })
      .populate("items.product");
    
    res.json({ 
      message: "Produto removido",
      cart: updatedCart 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao remover item" });
  }
});

module.exports = router;