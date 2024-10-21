import { useState, useEffect } from "react";
import Post from "../components/Post";
import { getUserPosts, createPost, deletePost } from "../services/postService";
import "../styles/TU-style.css";

export default function HomePage() {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Stato per l'immagine selezionata

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getUserPosts();
        setPosts(data);
      } catch (error) {
        setErrorMessage(
          "Errore durante il recupero dei post: " + error.message
        );
        console.error("Errore durante il recupero dei post:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]); // Aggiorna l'immagine selezionata
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (postContent.trim() !== "") {
      try {
        const newPost = {
          testo: postContent,
        };

        if (selectedImage) {
          const formData = new FormData();
          formData.append("testo", postContent);
          formData.append("immagine", selectedImage); // Aggiunge l'immagine al FormData

          await createPost(formData); // Invio del post con immagine
        } else {
          await createPost(newPost); // Invio del post senza immagine
        }

        const updatedPosts = await getUserPosts();
        setPosts(updatedPosts);
        setPostContent("");
        setSelectedImage(null); // Resetta l'immagine selezionata
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(
          "Errore durante la creazione del post: " + error.message
        );
        console.error("Errore durante la creazione del post:", error);
      }
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      const updatedPosts = await getUserPosts();
      setPosts(updatedPosts);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        "Errore durante l'eliminazione del post: " + error.message
      );
      console.error("Errore durante l'eliminazione del post:", error);
    }
  };

  const repeatCount = 999;

  return (
    <div className="bg-gray-900 text-white p-4 relative overflow-hidden">
      {/* Immagini laterali */}
      <div className="hidden lg:flex flex-col items-start absolute left-0 top-14">
        {[...Array(repeatCount)].map((_, index) => (
          <img
            key={index}
            src="/assets/images/T-TheoryUtenti-Logo.png"
            alt="Left Image"
            className="custom-image"
          />
        ))}
      </div>
      <div className="hidden lg:flex flex-col items-end absolute right-0 top-32">
        {[...Array(repeatCount)].map((_, index) => (
          <img
            key={index}
            src="/assets/images/U-TheoryUtenti-Logo.png"
            alt="Right Image"
            className="custom-image"
          />
        ))}
      </div>

      {/* Area di creazione del post */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 mx-auto max-w-2xl">
        <form onSubmit={handlePostSubmit}>
          <textarea
            placeholder="Vuoi pubblicare qualcosa?"
            className="w-full p-2 rounded-lg mb-2 text-black"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />

          <div className="icons flex justify-between">
            <label className="mr-5 text-gray-300 hover:text-white text-lg cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange} // Selezione immagine
                style={{ display: "none" }} // Nasconde l'input file
              />
              <img
                src="/assets/icons/add-photo.png"
                alt="icona aggiungi immagine"
              />
            </label>
            <button
              type="submit"
              className="mr-5 text-gray-300 hover:text-white text-lg"
            >
              <img src="/assets/icons/send.png" alt="icona di invio" />
            </button>
          </div>
        </form>
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}
      </div>

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


