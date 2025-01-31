import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      </div>
    </>
  );
}
