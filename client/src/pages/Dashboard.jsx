import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
          withCredentials: true,
        });
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Projects */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-gray-500">Total Projects</p>
          <h2 className="text-2xl font-bold mt-2">0</h2>
        </div>

        {/* Total Tasks */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-gray-500">Total Tasks</p>
          <h2 className="text-2xl font-bold mt-2">0</h2>
        </div>

        {/* Completed */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-gray-500">Completed</p>
          <h2 className="text-2xl font-bold text-green-500 mt-2">0</h2>
        </div>

        {/* Pending */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-2xl font-bold text-red-500 mt-2">0</h2>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
