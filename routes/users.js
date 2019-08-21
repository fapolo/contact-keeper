const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");

//@route    POST api/users
//@desc     Registra usuário
//@access   Public
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

      res.send("Usuário cadastrado");
    } catch (err) {
      console.error(err.message);
      res.status(400).send("Erro no Servidor");
    }
  }
);

module.exports = router;
