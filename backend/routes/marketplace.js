const express = require("express");
const router = express.Router();

// GET todos os produtos
router.get("/", (req, res) => {
  res.json({ produtos });
});

module.exports = router;
