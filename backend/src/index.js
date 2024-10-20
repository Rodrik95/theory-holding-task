const express = require("express");
const mysql = require("mysql2");
/* const bodyParser = require ("body-parser"); */
const cors = require("cors");
const app = express();
const port = 3002;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Sostituisci con l'origine esatta del tuo frontend
  credentials: true
}));
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

app.use((req, res, next) => {
  // Simula l'ID utente loggato. Puoi sostituire questo con l'autenticazione JWT o sessioni.
  req.userId = 1;  // Assumi che l'utente loggato abbia ID 1
  next();
});

// Importa e usa le rotte dei post
const postRoutes = require('./routes/postRoutes')(db);
app.use('/posts', postRoutes);
  
// Avviare il server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
