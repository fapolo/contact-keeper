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
router.post(
  "/",
  [
    auth,
    [
      check("name", "Por favor, adicione um nome ao contato")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    //verifica se há erros na validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erro no Servidor");
    }
  }
);

//@rota     PUT api/contacts/:id
//@desc     Atualiza contato
//acesso    Privado
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //verifica campos adicionados e adiciona no objeto caso existam
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.name = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact)
      return res.status(404).json({ msg: "Contato não encontrado" });

    //verifica se usuário logado detém o contato
    if (contact.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Você não tem permissão para alterar este contato!" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no Servidor");
  }
});

//@rota     DELETE api/contacts/:id
//@desc     remove contato
//@acesso   Privado
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact)
      return res.status(404).json({ msg: "Contato não encontrado" });

    //verifica se usuário logado detém o contato
    if (contact.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Você não tem permissão para alterar este contato!" });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "Contato removido" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no Servidor");
  }
});

module.exports = router;
