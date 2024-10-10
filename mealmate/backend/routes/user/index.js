const express = require("express");
const router = express.Router();
const userModel = require("../../database/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const authenticateToken = require("../../middleware/auth");

// Route zum Abrufen aller Nutzer
router.get("/user", async (req, res) => {
  try {
    const user = await userModel.findAll();
    res.json(user);
  } catch (err) {
    console.error("Fehler beim Abrufen der Nutzer:", err);
    res.status(500).send("Fehler beim Abrufen der Nutzer.");
  }
});

// Route zum Hinzufügen eines neuen Nutzers
router.post("/user", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    console.log("Empfangene Daten:", { username, password, email });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      password: hashedPassword,
      email,
    });
    console.log("Neuer Nutzer erstellt:", newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Fehler beim hinzufügen eines neuen Nutzers:", err);
    res.status(500).send("Fehler beim hinzufügen eines neuen Nutzers.");
  }
});

// Route zum Einloggen eines Nutzers
router.post("/Login", async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await userModel.findOne({
      where: {
        [Sequelize.Op.or]: [{ username: identifier }, { email: identifier }],
      },
    });

    if (!user) {
      return res.status(401).send("Ungültige Anmeldedaten.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Ungültige Anmeldedaten.");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Generated Token:", token);

    res.json({ token });
  } catch (err) {
    console.error("Fehler beim Einloggen des Nutzers:", err);
    res.status(500).send("Fehler beim Einloggen des Nutzers.");
  }
});

// Route zum Abrufen der Benutzerdaten basierend auf dem Token
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await userModel.findByPk(req.user.id);
    if (!user) {
      return res.status(404).send("Benutzer nicht gefunden.");
    }
    res.json(user);
  } catch (err) {
    console.error("Fehler beim Abrufen der Benutzerdaten.");
  }
});

module.exports = router;
