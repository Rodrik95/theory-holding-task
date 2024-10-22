const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // 1. Crea un post
  router.post("/", (req, res) => {
    const { testo, immagine } = req.body;

    // Verifica funzionamento
    console.log("Dati ricevuti per la creazione del post:", {
      testo,
      immagine,
    });

    // Check utente
    if (!req.userId) {
      return res.status(403).send({ message: "Utente non autorizzato." });
    }

    const sql = `INSERT INTO post (testo, immagine, data_pubblicazione, utente_id) 
               VALUES (?, ?, NOW(), ?)`;
    db.query(sql, [testo, immagine, req.userId], (err, result) => {
      if (err) {
        console.error("Errore nella query SQL:", err); // Logga l'errore
        return res
          .status(500)
          .send({ message: "Errore durante la creazione del post." });
      }
      res.status(201).send({ message: "Post creato con successo." });
    });
  });

  // GET POST
  router.get("/", (req, res) => {
    const sql =
      "SELECT p.*, u.username FROM post p JOIN utente u ON p.utente_id = u.id WHERE utente_id = ? ORDER BY data_pubblicazione DESC";
    db.query(sql, [req.userId], (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send({ message: "Errore durante il recupero dei post." });
      }
      res.json(results);
    });
  });

  // UPDATE POST
  router.put("/:id", (req, res) => {
    const { testo, immagine } = req.body;
    const sql = `UPDATE post SET testo = ?, immagine = ? WHERE id = ? AND utente_id = ?`;
    db.query(
      sql,
      [testo, immagine, req.params.id, req.userId],
      (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .send({ message: "Errore durante l'aggiornamento del post." });
        }
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .send({ message: "Post non trovato o non autorizzato." });
        }
        res.send({ message: "Post aggiornato con successo." });
      }
    );
  });

  // DELETE POST
  router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM post WHERE id = ? AND utente_id = ?";
    db.query(sql, [req.params.id, req.userId], (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send({ message: "Errore durante l'eliminazione del post." });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .send({ message: "Post non trovato o non autorizzato." });
      }
      res.send({ message: "Post eliminato con successo." });
    });
  });

  return router;
};
