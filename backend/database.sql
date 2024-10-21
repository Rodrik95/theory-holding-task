CREATE TABLE utente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE, 
    nome VARCHAR(100),
    cognome VARCHAR(100),
    immagine_profilo blob,
    data_nascita DATE,
    sesso ENUM 'M','F','X'
);

CREATE TABLE post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    testo TEXT,
    immagine blob,
    data_pubblicazione DATETIME,
    utente_id INT,
    FOREIGN KEY (utente_id) REFERENCES utente(id) ON DELETE CASCADE
);