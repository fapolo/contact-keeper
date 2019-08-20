const express = require("express");
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const contactsRoute = require("./routes/contacts");

const app = express();

app.get("/", (req, res) => res.json({ msg: "Hello World" }));

app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/contacts", contactsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));
