import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar.jsx";

const AdminLayout = () => {
  return (
    <div>
      <AdminSidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
