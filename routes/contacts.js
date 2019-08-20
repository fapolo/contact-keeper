const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Busca todos os contatos do usuário logado");
});

router.post("/", (req, res) => {
  res.send("Adiciona novo contato para o usuário logado");
});

router.put("/:id", (req, res) => {
  res.send("Atualiza o contato");
});

router.delete("/:id", (req, res) => {
  res.send("Apaga o contato");
});

module.exports = router;
