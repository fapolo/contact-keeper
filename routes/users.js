const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const User = require("../models/User");

//@route    POST api/users
//@desc     Register a user
//@access   Public
router.post(
  "/",
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send("Validação OK");
  }
);

module.exports = router;
