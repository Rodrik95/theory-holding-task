import { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // Importa il plugin per le date relative
import "dayjs/locale/it"; // Importa la lingua italiana
import "../styles/TU-style.css";

dayjs.extend(relativeTime);

export default function Post(props) {
  const [showPopup, setShowPopup] = useState(false); // Stato per gestire il popup
  const [timestamp, setTimestamp] = useState(""); // Stato per il timestamp relativo
  const [errorMessage, setErrorMessage] = useState(""); // Stato per i messaggi di errore

  useEffect(() => {
    // Imposta il locale in italiano
    dayjs.locale("it");

    // Imposta il timestamp relativo
    const postTime = props.post.createdAt ? props.post.createdAt : new Date();
    setTimestamp(dayjs(postTime).fromNow()); // Formattazione "relativa"
  }, [props.post.createdAt]);

  const handleDeleteConfirmation = () => {
    setShowPopup(true); // Mostra il popup
  };

  const handleCancelDelete = () => {
    setShowPopup(false); // Nasconde il popup
  };

  const handleConfirmDelete = async () => {
    try {
      await props.handleDeletePost(props.post.id); // Chiama la funzione di eliminazione
      setShowPopup(false); // Nasconde il popup dopo l'eliminazione
    } catch (error) {
      setErrorMessage(
        error.message || "Errore durante l'eliminazione del post"
      );
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4 mx-auto max-w-2xl">
      {/* Aggiungi il timestamp di pubblicazione relativo sopra l'immagine del profilo */}
      <div className="text-gray-400 text-sm mb-2">Pubblicato {timestamp}</div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <img
            src="/assets/images/gufopunk.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full mr-2"
          />
          <span className="font-bold">{props.post.username} </span>
        </div>
        <div className="icons flex space-x-2">
          <button className="mr-5 text-gray-300 hover:text-white text-lg">
            <img src="/assets/icons/pen.png" alt="icona modifica" />
          </button>
          <button
            onClick={handleDeleteConfirmation}
            className="mr-5 text-gray-300 hover:text-white text-lg"
          >
            <img src="/assets/icons/recycle-bin.png" alt="icona elimina" />
          </button>
        </div>
      </div>

      <p className="mb-2">
        {props.post.testo?.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br /> {/* Aggiungi un <br /> per ogni a capo */}
          </span>
        ))}
      </p>

      {props.post.immagine && !!props.post.immagine.data.length && (
        <img
          src={props.post.immagine}
          alt="Post"
          className="w-full h-auto rounded-lg mb-2 max-h-96 object-contain"
        />
      )}

      {/* <div className="flex space-x-2">
        <button className="bg-blue-600 text-white rounded-lg p-1">
          Mi piace
        </button>
        <button className="bg-blue-600 text-white rounded-lg p-1">
          Commenta
        </button>
        <button className="bg-blue-600 text-white rounded-lg p-1">
          Condividi
        </button>
      </div> */}

      {/* Mostra messaggio di errore se presente */}
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}

      {/* Popup di conferma */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 w-80 text-center">
            <p className="mb-4 text-white">
              Sei sicuro di voler eliminare questo post?
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white rounded-lg p-2 mr-2"
              >
                Conferma
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-blue-600 text-white rounded-lg p-2 mr-2"
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
