const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");

//@rota     POST api/users
//@desc     Registra usuário
//@acesso   Público
router.post(
  "/",
  //middleware - define campos obrigatórios express-validator
  [
    check("name", "Por favor, adicione o nome corretamente.")
      .not()
      .isEmpty(),
    check("email", "Por favor, adicione um E-mail válido").isEmail(),
    check(
      "password",
      "Por favor, adicione uma senha com no mínimo 6 caracteres."
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    //verifica se há erros na validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    //busca se usuário já existe no db
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "Usuário já cadastrado" });
      }

      //cria usuário - pwd encriptado com bcrypt
      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
      res.status(400).send("Erro no Servidor");
    }
  }
);

module.exports = router;
