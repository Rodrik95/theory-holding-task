const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const port = 3002;

const JWT_SECRET = "AFPOQWJF4Q8+F4FQ4+WF+9QF4+9E#";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "user db",
  password: "pw db",
  database: "theoryutenti",
});

db.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err);
    return;
  }
  console.log("Connesso al database MySQL.");
});

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
};

const authenticateToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token)
    return res.status(401).send("Accesso negato. Nessun token fornito.");

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Token non valido o scaduto.");
    req.userId = decoded.id;
    next();
  });
};

app.post("/register", async (req, res) => {
  const { email, password, nome, cognome, data_nascita, sesso, username } =
    req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email e password sono obbligatorie." });
  }

  try {
    const existingUserQuery =
      "SELECT * FROM utente WHERE email = ? OR username = ?";
    const [existingUsers] = await db
      .promise()
      .query(existingUserQuery, [email, username]);

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "Email o nickname già in uso." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO utente (email, password, nome, cognome, data_nascita, sesso, username) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [email, hashedPassword, nome, cognome, data_nascita, sesso, username],
      (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Errore durante la registrazione." });
        }
        res.status(201).json({ message: "Utente registrato con successo." });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore durante la registrazione." });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email e password sono obbligatorie." });
  }

  const sql = "SELECT * FROM utente WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Errore durante il login." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Utente non trovato." });
    }

    const user = results[0];

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(403).json({ message: "Credenziali non valide." });
    }

    const token = generateToken(user.id);
    const { password: _, ...userInfo } = user;
    res.json({ token, user: userInfo });
  });
});

app.use(authenticateToken);

const postRoutes = require("./routes/postRoutes")(db);
app.use("/posts", postRoutes);

const userRoutes = require("./routes/userRoutes")(db);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
