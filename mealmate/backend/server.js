const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5050;

app.use(bodyParser.json());

// Definiere den /api/signup Endpunkt
app.post("/api/signup", (req, res) => {
  const { username, email, password } = req.body;

  console.log("User data received:", { username, email, password });

  // Sende eine Antwort zurück
  res.status(201).json({ message: "User signed up successfully!" });
});

// Starte den Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
