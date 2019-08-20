const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send("Registra novo usuário");
});

module.exports = router;
