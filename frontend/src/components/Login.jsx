import "../styles/TU-style.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... logica di invio dei dati
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-900">
      {/* Sezione sinistra */}
      <div className="flex flex-col justify-start lg:w-1/2 w-full p-5 lg:p-10 text-white">
        <div className="flex items-center justify-start mb-6">
          <img
            src="/assets/images/TU-TheoryUtenti-Logo.png"
            alt="Logo Theory Utenti"
            className="w-64 h-auto mr-6"
          />
          <h1 className="text-4xl lg:text-5xl font-bold text-left mt-10">
            Theory Utenti
          </h1>
        </div>
        <div className="text-center text-lg mb-4 mt-10">
          Benvenuti nella nostra applicazione.
          <br />
          Accesso riservato ai membri registrati.
        </div>
      </div>

      {/* Sezione destra: il form di login */}
      <div className="flex items-center justify-center lg:w-1/2 w-full h-screen bg-gray-900">
        <div className="colorfull bg-white p-10 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-gray-900 text-4xl font-bold mb-6 text-center">
            Accedi
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-lg font-medium mb-4 text-gray-900"
              >
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
            <div className="mb-6">
              <label
                htmlFor="password"
                className="text-lg font-medium mb-4 text-gray-900"
              >
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
            <div className="flex items-center justify-between">
              <button
                className="bg-purple-900 text-white font-medium p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-700 hover:bg-purple-800 disabled:bg-purple-300"
                type="submit"
              >
                Accedi
              </button>
            </div>
          </form>

          {/* Logica di non registrati */}
          <div className="mt-6 text-center">
            <p className="text-gray-700">
              Ancora non sei registrato?{" "}
              <Link
                to="/register"
                className="text-purple-900 hover:underline font-medium"
              >
                Fallo ora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
