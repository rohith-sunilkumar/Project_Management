import { useEffect, useState } from "react";
import axios from "axios";

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/tasks`,
        { withCredentials: true }
      );
      console.log(res.data);
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

  const handleEditTask = async (taskId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,
        editForm,
        { withCredentials: true }
      );
      setEditTaskId(null);
      fetchTasks();
      alert("Task updated successfully");
    } catch (error) {
      alert("Failed to update task");
      console.log("Error updating task:", error);
    }
  };

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

      {loading && <p className="text-gray-500">Loading tasks...</p>}

      {!loading && tasks.length === 0 && (
        <p className="text-gray-500">No tasks available</p>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded-xl shadow"
          >
            {editTaskId === task._id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="date"
                  value={editForm.dueDate ? editForm.dueDate.substring(0, 10) : ""}
                  onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                  className="border p-2 rounded w-full"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setEditTaskId(null)}
                    className="text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleEditTask(task._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold">{task.title}</h2>

                <p className="text-gray-500 text-sm">
                  {task.description || "No description"}
                </p>

                <p className="text-sm mt-2">
                  <span className="font-semibold">Project:</span>{" "}
                  {task.project?.title || "N/A"}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">User:</span>{" "}
                  {task.project?.user?.name || "N/A"}
                </p>

                <p
                  className={`mt-2 text-sm font-semibold ${task.status === "Completed"
                      ? "text-green-500"
                      : "text-red-500"
                    }`}
                >
                  {task.status}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Due:{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No deadline"}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      setEditTaskId(task._id);
                      setEditForm({
                        title: task.title,
                        description: task.description,
                        dueDate: task.dueDate || "",
                      });
                    }}
                    className="w-full bg-yellow-400 text-white px-3 py-2 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTasks;