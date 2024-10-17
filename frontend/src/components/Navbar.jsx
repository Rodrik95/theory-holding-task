import "../styles/TU-style.css";

export default function Navbar() {
  return (
    <nav className="colorfull md:sticky md:top-0 z-10 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo e nome del sito */}
        <div className="flex items-center">
          <img
            src="/assets/images/TU-TheoryUtenti-Logo.png"
            alt="Logo Theory Utenti"
            className="w-10 h-10 mr-2"
          />
          <span className="text-white text-2xl font-bold">Theory Utenti</span>
        </div>

        {/* Link di navigazione */}
        <div className="icons flex space-x-4">
          <a href="/homepage" className="mr-5 text-gray-300 hover:text-white text-lg">
            <img src="/assets/icons/home.png" alt="icona home" />
          </a>
          <a href="/profile" className="mr-5 text-gray-300 hover:text-white text-lg">
            <img src="/assets/icons/user.png" alt="icona profilo" />
          </a>
        </div>
      </div>
    </nav>
  );
}

  