const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");

//@rota     GET api/auth
//@desc     Recupera usuário logado
//@acesso   Privado
router.get("/", (req, res) => {
  res.send("Busca usuário registrado");
});

//@rota     POST api/auth
//@desc     Autoriza usuário e recupera token
//@acesso   Público
router.post(
  "/",
  [
    check("email", "Por favor, adicione um E-mail válido").isEmail(),
    check("password", "Por favor, digite a senha.").exists()
  ],
  async (req, res) => {
    //verifica se há erros na validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      //verifica e-mail do usuário
      if (!user) {
        return res.status(400).json({ msg: "E-mail inválido" });
      }

      //compara senhas com bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Senha inválida" });
      }

      //cria token pro usuário registrado
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erro no Servidor");
    }
  }
);

module.exports = router;
