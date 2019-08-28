const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const contactsRoute = require("./routes/contacts");

const app = express();
connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/contacts", contactsRoute);

// Static Assest for production
if (process.env.NODE_ENV === "production") {
  //static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));
