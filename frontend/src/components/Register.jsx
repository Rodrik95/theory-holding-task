import "../styles/TU-style.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... logica di invio dei dati
  };

  return (
    <div className="flex flex-col-reverse md:flex-row bg-gray-900">
      {/* Sezione sinistra: modulo di registrazione */}
      <div className="colorfull bg-white p-10 lg:m-10 rounded-lg shadow-md w-full md:w-7/12">
        <h1 className="text-gray-900 text-4xl font-bold mb-6 text-center">
          Registrati
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="mb-4 relative">
              <label htmlFor="name" className="text-lg font-medium mb-2 text-gray-900">
                Nome
              </label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4 relative">
              <label htmlFor="surname" className="text-lg font-medium mb-2 text-gray-900">
                Cognome
              </label>
              <input
                type="text"
                id="surname"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>

            <div className="mb-4 relative">
              <label htmlFor="dob" className="text-lg font-medium mb-2 text-gray-900">
                Data di Nascita
              </label>
              <input
                type="date"
                id="dob"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <div className="mb-4 relative">
              <label className="text-lg font-medium mb-2 text-gray-900">Sesso</label>
              <div className="flex items-center">
                <label className="mr-2">
                  <input
                    type="radio"
                    value="M"
                    checked={gender === "M"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  M
                </label>
                <label className="mr-2">
                  <input
                    type="radio"
                    value="F"
                    checked={gender === "F"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  F
                </label>
                <label>
                  <input
                    type="radio"
                    value="X"
                    checked={gender === "X"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  X
                </label>
              </div>
            </div>

            <div className="mb-4 relative col-span-2">
              <label htmlFor="username" className="text-lg font-medium mb-2 text-gray-900">
                Nick Utente
              </label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4 col-span-2">
              <label htmlFor="email" className="text-lg font-medium mb-2 text-gray-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4 col-span-2">
              <label htmlFor="password" className="text-lg font-medium mb-2 text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-6 col-span-2">
              <label htmlFor="confirmPassword" className="text-lg font-medium mb-2 text-gray-900">
                Conferma Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between col-span-2">
              <button
                className="bg-purple-900 text-white font-medium p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-700 hover:bg-purple-800 disabled:bg-purple-300"
                type="submit"
              >
                Registrati
              </button>
            </div>
          </div>
        </form>
        {/* Logica di non registrati */}
        <div className="mt-6 text-center">
            <p className="text-gray-700">
              Sei già registrato?{" "}
              <Link
                to="/login"
                className="text-purple-900 hover:underline font-medium"
              >
                Accedi
              </Link>
            </p>
          </div>
      </div>

      {/* Sezione destra: logo e descrizione */}
      <div className="flex flex-col justify-start w-full md:w-5/12 p-10 text-white">
        <div className="flex items-center justify-start mb-6">
          <img 
            src="/assets/images/TU-TheoryUtenti-Logo.png" 
            alt="Logo Theory Utenti" 
            className="w-64 h-auto mr-6"
          />
          <h1 className="text-5xl font-bold text-left">Theory Utenti</h1>
        </div>
        <div className="text-center text-lg mb-4 mt-20">
          Benvenuti nella nostra applicazione.
          <br />
          Registrati per accedere a tutte le funzionalità.
        </div>
      </div>
    </div>
  );
}

export default Register;



