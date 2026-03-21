import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/");
  };

  return (
    <>
      {/* 🔹 Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 bg-gray-900 text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* 🔹 Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-5 flex flex-col justify-between transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Top Section */}
        <div>
          <h1 className="text-xl font-bold mb-8">Admin Panel</h1>

          <nav className="flex flex-col gap-4">
            <NavLink to="/admin">Dashboard</NavLink>
            <NavLink to="/admin/users">Users</NavLink>
            <NavLink to="/admin/projects">Projects</NavLink>
          </nav>
        </div>

        {/* 🔻 Bottom Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 p-2 rounded mt-6"
        >
          Logout
        </button>
      </div>

      {/* 🔹 Overlay (for mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;