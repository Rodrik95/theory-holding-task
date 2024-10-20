const API_URL = "http://localhost:3002";

// Funzione per la registrazione
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      // Recupera il messaggio di errore dal server se disponibile
      const errorData = await response.json();
      throw new Error(errorData.message || "Errore durante la registrazione");
    }

    return response.json();
  } catch (error) {
    // Propaga l'errore
    throw new Error(error.message || "Errore durante la registrazione");
  }
};

// Funzione per aggiornare i dati dell'utente
export const updateUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/user/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      // Recupera il messaggio di errore dal server se disponibile
      const errorData = await response.json();
      throw new Error(errorData.message || "Errore durante la modifica");
    }

    return response.json();
  } catch (error) {
    // Propaga l'errore
    throw new Error(error.message || "Errore durante la modifica");
  }
};

// Funzione per eliminare l'account utente
export const deleteUser = async () => {
  try {
    const response = await fetch(`${API_URL}/user/delete`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      },
    });

    if (!response.ok) {
      // Recupera il messaggio di errore dal server se disponibile
      const errorData = await response.json();
      throw new Error(errorData.message || "Errore durante l'eliminazione dell'account");
    }

    return response.json();
  } catch (error) {
    // Propaga l'errore
    throw new Error(error.message || "Errore durante l'eliminazione dell'account");
  }
};


