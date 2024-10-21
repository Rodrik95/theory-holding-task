import { useState, useRef, useContext } from "react";
import { updateUser, deleteUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import "../styles/TU-style.css";
import { AuthContext } from "../contexts/AuthContext";

export default function Profile() {
  const navigate = useNavigate(); // Inizializza useNavigate
  const { logout } = useContext(AuthContext);

  const [profileData, setProfileData] = useState({
    imageUrl: "/assets/images/gufopunk.jpg",
    username: sessionStorage.getItem("username"),
    email: sessionStorage.getItem("email"),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState({
    username: profileData.username,
    email: profileData.email,
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const errorRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(""); // "delete" | "logout" | "save"

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage("");
  };

  // Funzione per gestire l'upload dell'immagine
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData((prevData) => ({ ...prevData, imageUrl }));
    }
  };

  // Edit profile function
  const handleEditProfile = async () => {
    if (!newData.username || !newData.email || !newData.password) {
      setErrorMessage("Nickname, email e password sono richiesti.");
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (newData.password !== newData.confirmPassword) {
      setErrorMessage("Le password non corrispondono.");
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    try {
      await updateUser(newData);
      setProfileData((prevData) => ({
        ...prevData,
        username: newData.username,
        email: newData.email,
      }));
      setPopupType("save");
      setShowPopup(true);
      setIsEditing(false); // Exit edit mode after saving
    } catch (error) {
      setErrorMessage(error.message);
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDeleteAccount = () => {
    setPopupType("delete");
    setShowPopup(true);
  };

  const handleLogout = () => {
    setPopupType("logout");
    setShowPopup(true);
  };

  // Popup confirmation for delete
  const handleConfirmDelete = async () => {
    try {
      await deleteUser();
      logout();
      console.log("Account eliminato");
      setShowPopup(false);
    } catch {
      setErrorMessage("Errore durante l'eliminazione dell'account.");
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Popup confirmation for logout
  const handleConfirmLogout = async () => {
    try {
      // Implement logout functionality (e.g., clear session storage)
      logout();
      setShowPopup(false);
      navigate("/login"); // Reindirizza alla pagina di login
    } catch {
      setErrorMessage("Errore durante il logout.");
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewData({
      username: profileData.username,
      email: profileData.email,
      password: "",
      confirmPassword: "",
    });
    setErrorMessage("");
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Impostazioni profilo</h2>

      <div className="mb-4 relative">
        <img
          src={profileData.imageUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
        />
        <label htmlFor="image-upload" className="absolute inset-0 cursor-pointer flex justify-center items-center ml-16 mt-20">
        <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <button className="icons">
            <img src="/assets/icons/add-photo.png" alt="icona aggiungi" />
          </button>
        </label>
      </div>

      {errorMessage && (
        <p ref={errorRef} className="error-message text-red-500 text-center mb-4">
          {errorMessage}
        </p>
      )}

      {!isEditing ? (
        <>
          <div className="icons mb-4 flex justify-between items-center">
            <div>
              <label className="block mb-2">Nickname:</label>
              <p className="text-gray-300 inline">{profileData.username}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="mr-5 text-gray-300 hover:text-white text-lg"
            >
              <img src="/assets/icons/pen.png" alt="icona modifica" />
            </button>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <p className="text-gray-300">{profileData.email}</p>
          </div>

          <div className="icons flex justify-between mt-4">
            <button
              onClick={handleLogout}
              className="mr-5 text-gray-300 hover:text-white text-lg"
            >
              <img src="/assets/icons/logout.png" alt="icona logout" />
            </button>
            <button
              onClick={handleDeleteAccount}
              className="mr-5 text-gray-300 hover:text-white text-lg"
            >
              <img src="/assets/icons/dead.png" alt="icona elimina account" />
            </button>
          </div>
        </>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block mb-2">Nickname:</label>
            <input
              type="text"
              name="username"
              value={newData.username}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={newData.email}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Nuova Password:</label>
            <input
              type="password"
              name="password"
              value={newData.password}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Conferma Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={newData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleEditProfile}
              className="bg-blue-600 text-white p-2 rounded-lg"
            >
              Salva modifiche
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-600 text-white p-2 rounded-lg"
            >
              Annulla
            </button>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 w-80 text-center">
            <h3 className="text-lg font-bold">
              {popupType === "delete" && "Sei sicuro di voler eliminare il tuo account?"}
              {popupType === "logout" && "Sei sicuro di voler effettuare il logout?"}
              {popupType === "save" && "Modifiche salvate!"}
            </h3>
            <div className="mt-4">
              {popupType === "delete" && (
                <>
                  <button onClick={handleConfirmDelete} className="bg-red-600 text-white px-4 py-2 rounded mr-2">
                    Elimina
                  </button>
                  <button onClick={() => setShowPopup(false)} className="bg-gray-600 text-white px-4 py-2 rounded">
                    Annulla
                  </button>
                </>
              )}
              {popupType === "logout" && (
                <>
                  <button onClick={handleConfirmLogout} className="bg-red-600 text-white px-4 py-2 rounded mr-2">
                    Logout
                  </button>
                  <button onClick={() => setShowPopup(false)} className="bg-gray-600 text-white px-4 py-2 rounded">
                    Annulla
                  </button>
                </>
              )}
              {popupType === "save" && (
                <button onClick={() => setShowPopup(false)} className="bg-gray-600 text-white px-4 py-2 rounded">
                  Chiudi
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}













