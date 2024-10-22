const API_URL = "http://localhost:3002";

// CREATE UTENTE
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
      const errorData = await response.json();
      throw new Error(errorData.message || "Errore durante la registrazione");
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message || "Errore durante la registrazione");
  }
};

// UPDATE UTENTE
export const updateUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/user/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Errore durante la modifica");
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message || "Errore durante la modifica");
  }
};

// DELETE UTENTE
export const deleteUser = async () => {
  try {
    const response = await fetch(`${API_URL}/user/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore durante l'eliminazione dell'account"
      );
    }

    return response.json();
  } catch (error) {
    throw new Error(
      error.message || "Errore durante l'eliminazione dell'account"
    );
  }
};
