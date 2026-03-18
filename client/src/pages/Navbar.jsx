import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1
        className="text-xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Project Manager
      </h1>

      {/* Links */}
      <div className="flex items-center gap-6">
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
    </nav>
  );
};

export default Navbar;