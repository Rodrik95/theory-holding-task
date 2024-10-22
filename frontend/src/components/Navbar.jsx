import { Link } from "react-router-dom";
import "../styles/TU-style.css";

export default function Navbar() {
  return (
    <nav className="colorfull md:sticky md:top-0 z-10 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* SINISTRA */}
        <div className="flex items-center">
          <img
            src="/assets/images/TU-TheoryUtenti-Logo.png"
            alt="Logo Theory Utenti"
            className="w-10 h-10 mr-2"
          />
          <span className="text-white text-2xl font-bold">Theory Utenti</span>
        </div>

        {/* DESTRA */}
        <div className="icons flex space-x-4">
          <Link
            to="/homepage"
            className="mr-5 text-gray-300 hover:text-white text-lg"
          >
            <img src="/assets/icons/home.png" alt="icona home" />
          </Link>
          <Link
            to="/profile"
            className="mr-5 text-gray-300 hover:text-white text-lg"
          >
            <img src="/assets/icons/user.png" alt="icona profilo" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
