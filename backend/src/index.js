const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configurazione della connessione a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Torment95",
  database: "theoryutenti",
});

// Connettersi al database
db.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err);
    return;
  }
  console.log("Connesso al database MySQL.");
});

// Rotta di esempio
app.get("/", (req, res) => {
  res.send("Backend del progetto di theoryutenti");
});
  
// Avviare il server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
