const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Backend Arkhadia funcionando 🚀" });
});

module.exports = router;