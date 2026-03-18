import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/dashboard`,
          { withCredentials: true },
        );
        setStats({
          totalUsers: res.data.stats.users,
          totalProjects: res.data.stats.projects,
          totalTasks: res.data.stats.tasks,
          completedTasks: res.data.stats.completed,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded shadow">
          <p className="text-gray-500">Users</p>
          <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
        </div>
        <div className="bg-white p-5 rounded shadow">
          <p className="text-gray-500">Projects</p>
          <h2 className="text-2xl font-bold">{stats.totalProjects}</h2>
        </div>
        <div className="bg-white p-5 rounded shadow">
          <p className="text-gray-500">Tasks</p>
          <h2 className="text-2xl font-bold">{stats.totalTasks}</h2>
        </div>
        <div className="bg-white p-5 rounded shadow">
          <p className="text-gray-500">Completed</p>
          <h2 className="text-2xl font-bold text-green-500">
            {stats.completedTasks}
          </h2>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
