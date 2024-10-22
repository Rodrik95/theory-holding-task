const API_URL = "http://localhost:3002/posts";

// CREATE POST
export const createPost = async (postData) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Aggiunto token JWT per autenticazione
    },
    body: JSON.stringify(postData),
    credentials: "include", // Include i cookie se usi la sessione
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Errore durante la creazione del post"
    );
  }

  return response.json();
};

// GET POST
export const getUserPosts = async () => {
  const response = await fetch(`${API_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Aggiunto token JWT per autenticazione
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Errore durante il recupero dei post");
  }

  return response.json();
};

// DELETE POST
export const deletePost = async (postId) => {
  const response = await fetch(`${API_URL}/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Aggiunto token JWT per autenticazione
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Errore durante l'eliminazione del post"
    );
  }

  return response.json();
};
