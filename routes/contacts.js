const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Contact = require("../models/Contact");

//@rota     GET api/contacts
//@desc     Recupera os contatos do usuário
//@acesso   Privado
router.get("/", auth, async (req, res) => {
  try {
    //busca contatos do usuário autenticado, organizado a partir do mais recente (-1)
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no Servidor");
  }
});

//@rota     POST api/contacts
//@desc     Adiciona novo contato
//@acesso   Privado
router.post("/", (req, res) => {
  res.send("Adiciona novo contato para o usuário logado");
});

//@rota     PUT api/contacts/:id
//@desc     Atualiza contato
//acesso    Privado
router.put("/:id", (req, res) => {
  res.send("Atualiza o contato");
});

//@rota     DELETE api/contacts/:id
//@desc     remove contato
//@acesso   Privado
router.delete("/:id", (req, res) => {
  res.send("Apaga o contato");
});

module.exports = router;
