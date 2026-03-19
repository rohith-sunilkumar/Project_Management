import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 relative">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Project Manager
        </h1>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="hover:text-blue-500">
            Dashboard
          </Link>

          <Link to="/projects" className="hover:text-blue-500">
            Projects
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 pb-2 border-t pt-4">
          <Link to="/dashboard" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link to="/projects" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>
            Projects
          </Link>
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full text-center"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;