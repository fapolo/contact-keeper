const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Busca usuário registrado");
});

router.post("/", (req, res) => {
  res.send("Cria novo usuário");
});

module.exports = router;
