import { useState } from "react";

export default function HomePage() {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([
    {
      content: "Questo è un post di prova per testare la visualizzazione!",
      user: "Username",
      image: "/assets/images/villainstyle.webp", // Aggiungi un'immagine di esempio qui
    },
  ]);

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim() !== "") {
      setPosts([...posts, { content: postContent, user: "Username" }]);
      setPostContent(""); // Reset the input after submission
    }
  };

  const handleDeletePost = (index) => {
    const newPosts = posts.filter((_, i) => i !== index);
    setPosts(newPosts);
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
            onChange={handlePostChange}
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
          <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4 mx-auto max-w-2xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img
                  src="/assets/images/gufopunk.jpg" // Aggiungi l'immagine del profilo qui
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <span className="font-bold">{post.user}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDeletePost(index)}
                  className="bg-red-600 text-white rounded-lg p-1"
                >
                  Elimina
                </button>
                <button className="bg-yellow-600 text-white rounded-lg p-1">
                  Modifica
                </button>
              </div>
            </div>
            <p className="mb-2">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="w-full h-auto rounded-lg mb-2 max-h-96 object-contain" // Limita l'altezza dell'immagine
              />
            )}
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white rounded-lg p-1">
                Mi piace
              </button>
              <button className="bg-blue-600 text-white rounded-lg p-1">
                Commenta
              </button>
              <button className="bg-blue-600 text-white rounded-lg p-1">
                Condividi
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

