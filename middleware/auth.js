const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //Pegar o token do header
  const token = req.header("x-auth-token");

  //verifica se o token existe
  if (!token) {
    return res.status(401).json({ msg: "Negado. Token não encontrado" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token inválido" });
  }
};
