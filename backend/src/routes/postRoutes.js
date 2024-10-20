const express = require('express');
const router = express.Router();

// Passiamo il database tramite parametro alla funzione
module.exports = (db) => {
  
  // 1. Crea un post
  router.post('/', (req, res) => {
    const { titolo, testo, immagine, utente_id } = req.body;
    if (req.userId !== utente_id) {
      return res.status(403).send('Accesso negato. Non puoi creare post per altri utenti.');
    }
    const sql = `INSERT INTO post (titolo, testo, immagine, data_pubblicazione, utente_id) 
                 VALUES (?, ?, ?, NOW(), ?)`;
    db.query(sql, [titolo, testo, immagine, utente_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Errore durante la creazione del post.');
      }
      res.status(201).send('{}');
    });
  });

  // 2. Ottieni tutti i post dell'utente loggato
  router.get('/', (req, res) => {
    const sql = 'SELECT p.*, u.nickname FROM post p JOIN utente u ON p.utente_id = u.id WHERE utente_id = ?';
    db.query(sql, [req.userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Errore durante il recupero dei post.');
      }
      res.json(results);
    });
  });

  // 3. Ottieni un post per ID se appartiene all'utente loggato
  router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM post WHERE id = ? AND utente_id = ?';
    db.query(sql, [req.params.id, req.userId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Errore durante il recupero del post.');
      }
      if (result.length === 0) {
        return res.status(404).send('Post non trovato o non autorizzato.');
      }
      res.json(result[0]);
    });
  });

  // 4. Aggiorna un post se appartiene all'utente loggato
  router.put('/:id', (req, res) => {
    const { titolo, testo, immagine } = req.body;
    const sql = `UPDATE post SET titolo = ?, testo = ?, immagine = ? WHERE id = ? AND utente_id = ?`;
    db.query(sql, [titolo, testo, immagine, req.params.id, req.userId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Errore durante l\'aggiornamento del post.');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Post non trovato o non autorizzato.');
      }
      res.send('{}');
    });
  });

  // 5. Elimina un post se appartiene all'utente loggato
  router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM post WHERE id = ? AND utente_id = ?';
    db.query(sql, [req.params.id, req.userId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Errore durante l\'eliminazione del post.');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Post non trovato o non autorizzato.');
      }
      res.send('{}');
    });
  });

  return router;
};
