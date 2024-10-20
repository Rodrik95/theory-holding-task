const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

module.exports = (db) => {
  // Aggiornamento utente
  router.put("/", async (req, res) => {
    const userId = req.userId;
    const { email, password, username } = req.body;

    // Verifica se l'ID utente è fornito
    if (!userId) {
      return res.status(400).json({ message: "ID utente mancante." });
    }

    try {
      // Crea un oggetto per i dati aggiornati
      const updatedData = {};
      if (email) updatedData.email = email;
      if (password) updatedData.password = await bcrypt.hash(password, 10);
      if (username) updatedData.username = username;

      // Crea una query per aggiornare l'utente
      const sql = "UPDATE utente SET ? WHERE id = ?";
      db.query(sql, [updatedData, userId], (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Errore durante l'aggiornamento dell'utente." });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Utente non trovato." });
        }
        res.json({ message: "Utente aggiornato con successo." });
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Errore durante l'aggiornamento dell'utente." });
    }
  });

  // Eliminazione utente
  router.delete("/", (req, res) => {
    const userId = req.userId;

    // Verifica se l'ID utente è fornito
    if (!userId) {
      return res.status(400).json({ message: "ID utente mancante." });
    }

    const sql = "DELETE FROM utente WHERE id = ?";
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Errore durante l'eliminazione dell'utente." });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Utente non trovato." });
      }
      res.json({ message: "Utente eliminato con successo." });
    });
  });

  return router;
};
