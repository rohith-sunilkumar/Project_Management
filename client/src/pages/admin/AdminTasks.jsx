import { useEffect, useState } from "react";
import axios from "axios";

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/tasks`,
        { withCredentials: true }
      );

      console.log(res.data); // ✅ debug

      setTasks(res.data.tasks || []);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,
        { withCredentials: true }
      );
      setTasks(tasks.filter((task) => task._id !== taskId));
      alert("Task deleted successfully");
    } catch (error) {
      alert("Failed to delete task");
      console.log("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Tasks</h1>

      {/* Loading */}
      {loading && <p className="text-gray-500">Loading tasks...</p>}

      {/* Empty State */}
      {!loading && tasks.length === 0 && (
        <p className="text-gray-500">No tasks available</p>
      )}

      {/* Task List */}
      <div className="grid md:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded-xl shadow"
          >
            {/* Title */}
            <h2 className="text-lg font-bold">{task.title}</h2>

            {/* Description */}
            <p className="text-gray-500 text-sm">
              {task.description || "No description"}
            </p>

            {/* Project */}
            <p className="text-sm mt-2">
              <span className="font-semibold">Project:</span>{" "}
              {task.project?.title || "N/A"}
            </p>

            {/* User */}
            <p className="text-sm">
              <span className="font-semibold">User:</span>{" "}
              {task.project?.user?.name || "N/A"}
            </p>

            {/* Status */}
            <p
              className={`mt-2 text-sm font-semibold ${
                task.status === "Completed"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {task.status}
            </p>

            {/* Due Date */}
            <p className="text-xs text-gray-400 mt-1">
              Due:{" "}
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No deadline"}
            </p>

            {/* Delete Button */}
            <button
              onClick={() => handleDeleteTask(task._id)}
              className="mt-4 w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
            >
              Delete Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTasks;