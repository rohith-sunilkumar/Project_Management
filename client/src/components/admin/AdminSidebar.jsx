import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed top-0 left-0">
      <h1 className="text-xl font-bold mb-8">Admin Panel</h1>

      <nav className="flex flex-col gap-4">
        <NavLink to="/admin">Dashboard</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/projects">Projects</NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;