// postService.js

const API_URL = "http://localhost:3002/posts"; // il tuo URL backend

// Crea un nuovo post
export const createPost = async (postData) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify(postData),
    credentials: "include", // include i cookie se usi la sessione
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Errore durante la creazione del post");
  }

  return response.json();
};

// Ottieni tutti i post dell'utente
export const getUserPosts = async () => {
  const response = await fetch(`${API_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Errore durante il recupero dei post");
  }

  return response.json();
};

// Ottieni un post per ID
export const getPostById = async (postId) => {
  const response = await fetch(`${API_URL}/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Errore durante il recupero del post");
  }

  return response.json();
};

// Elimina un post
export const deletePost = async (postId) => {
  const response = await fetch(`${API_URL}/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Errore durante l'eliminazione del post");
  }

  return response.json();
};


