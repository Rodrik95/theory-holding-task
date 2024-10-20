import { useState, useEffect } from "react";
import Post from "../components/Post";
import { getUserPosts, createPost, deletePost } from "../services/postService"; // Importiamo i servizi per gestire i post

export default function HomePage() {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);

  // useEffect per caricare i post quando la pagina viene caricata
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getUserPosts(); // Chiamata all'API per ottenere i post
        setPosts(data);
      } catch (error) {
        console.error("Errore durante il recupero dei post:", error);
      }
    };

    fetchPosts();
  }, []);

  // Funzione per gestire l'invio di un nuovo post
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (postContent.trim() !== "") {
      try {
        const newPost = { titolo: "Titolo del post", testo: postContent, immagine: "", utente_id: 1 }; // Inserisci qui i campi necessari
        await createPost(newPost); // Chiamata all'API per creare un nuovo post

        // Ricarica i post dopo la creazione
        const updatedPosts = await getUserPosts();
        setPosts(updatedPosts);
        setPostContent(""); // Resetta l'input dopo la pubblicazione
      } catch (error) {
        console.error("Errore durante la creazione del post:", error);
      }
    }
  };

  // Funzione per gestire la cancellazione del post
  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId); // Chiama l'API per cancellare il post
      const updatedPosts = await getUserPosts(); // Ricarica i post dopo la cancellazione
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Errore durante l'eliminazione del post:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-4">
      {/* Area di creazione del post */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 mx-auto max-w-2xl">
        <form onSubmit={handlePostSubmit}>
          <textarea
            placeholder="Vuoi pubblicare qualcosa?"
            className="w-full p-2 rounded-lg mb-2 text-black"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <div className="flex justify-between">
            <button type="button" className="bg-purple-600 text-white rounded-lg p-2">
              Aggiungi immagine
            </button>
            <button type="submit" className="bg-blue-600 text-white rounded-lg p-2">
              Pubblica
            </button>
          </div>
        </form>
      </div>

      {/* Post esistenti */}
      {posts.length === 0 ? (
        <div className="bg-gray-800 p-4 rounded-lg mb-4 mx-auto max-w-2xl">
          <p>Nessun post disponibile. Pubblica qualcosa!</p>
        </div>
      ) : (
        posts.map((post, index) => (
          <Post key={index} post={post} handleDeletePost={handleDeletePost} />
        ))
      )}
    </div>
  );
}


