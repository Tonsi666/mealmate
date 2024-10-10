const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5050;
const cors = require("cors");
const sequelize = require("./database/config/database");
const userRoutes = require("./routes/user");

require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
app.use("/api", userRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Verbindung zur Datenbank erfolgreich.");
  })
  .catch((err) => {
    console.error("Fehler bei der Verbindung zur Datenbank:", err);
  });

sequelize
  .sync()
  .then(() => {
    console.log("Datenbank synchronisiert.");
  })
  .catch((err) => {
    console.error("Fehler bei der Synchronisation der Datenbank:", err);
  });

// Definiere den /api/signup Endpunkt
app.post("/api/user", (req, res) => {
  const { username, email, password } = req.body;

  console.log("User data received:", { username, email, password });

  // Sende eine Antwort zurück
  res.status(201).json({ message: "User signed up successfully!" });
});

// Starte den Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
