import { useState } from "react";

export default function Profile() {
  // Stato per memorizzare i dati dell'utente
  const [profileData, setProfileData] = useState({
    imageUrl: "/assets/images/gufopunk.jpg", // Immagine di default
    nickname: "utente_nickname",
    email: "utente@example.com",
    password: "******",
  });

  // Funzioni per gestire il cambiamento dei dati
  const handleImageChange = (e) => {
    const newImageUrl = URL.createObjectURL(e.target.files[0]);
    setProfileData({ ...profileData, imageUrl: newImageUrl });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleDeleteAccount = () => {
    // Logica per eliminare l'account (da implementare)
    console.log("Account eliminato");
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Impostazioni profilo</h2>

      {/* Mostra l'immagine del profilo */}
      <div className="mb-4">
        <img
          src={profileData.imageUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
        />
        <label className="block text-center">
          Cambia immagine del profilo
          <input type="file" className="hidden" onChange={handleImageChange} />
        </label>
      </div>

      {/* Campi per nickname, email e password */}
      <div className="mb-4">
        <label className="block mb-2">Nickname:</label>
        <input
          type="text"
          name="nickname"
          value={profileData.nickname}
          onChange={handleInputChange}
          className="w-full p-2 bg-gray-700 text-white rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleInputChange}
          className="w-full p-2 bg-gray-700 text-white rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Password:</label>
        <input
          type="password"
          name="password"
          value={profileData.password}
          onChange={handleInputChange}
          className="w-full p-2 bg-gray-700 text-white rounded"
        />
      </div>

      {/* Bottone per eliminare l'account */}
      <div className="text-center">
        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white p-2 rounded-lg"
        >
          Elimina account
        </button>
      </div>
    </div>
  );
}


