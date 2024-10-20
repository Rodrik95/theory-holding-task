// postService.js

const API_URL = "http://localhost:3002/posts"; // il tuo URL backend

// Crea un nuovo post
export const createPost = async (postData) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
    credentials: "include", // include i cookie se usi la sessione
  });

  if (!response.ok) {
    throw new Error("Errore durante la creazione del post");
  }

  return response.json();
};

// Ottieni tutti i post dell'utente
export const getUserPosts = async () => {
  const response = await fetch(`${API_URL}`, {
    method: "GET",
    credentials: "include", // include i cookie
  });

  if (!response.ok) {
    throw new Error("Errore durante il recupero dei post");
  }

  return response.json();
};

export const deletePost = async (postId) => {
  const response = await fetch(`${API_URL}/${postId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Errore durante l'eliminazione del post");
  }

  return response.json();
};
