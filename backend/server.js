const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const games = require("./routes/games");
const auth = require("./routes/auth");
const posts = require("./routes/posts");
const comments = require("./routes/comments")

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com o MongoDB
mongoose.connect("mongodb+srv://arkhadia168_db_user:safu54e0ahDeMh02@arkhadia.tc5pwcx.mongodb.net/Arkhadia", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB conectado"))
.catch(err => console.error("❌ Erro no MongoDB:", err));

// Rotas da API
app.use("/api/games", games);
app.use("/api/auth", auth);
app.use("/api/posts", posts);  // <= ADICIONE ESTA LINHA
app.use("/api/comments", comments);

// Página 404 (agora só em JSON)
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});