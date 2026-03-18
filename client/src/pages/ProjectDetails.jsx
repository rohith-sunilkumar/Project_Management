import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTasks, createTask, deleteTask, updateTask } from "../api/taskApi";

const ProjectDetails = () => {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const loadTasks = async () => {
    try {
      const res = await getTasks(id);
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadTasks();
  }, []);
  const handleCreate = async () => {
    if (!form.title) return alert("Title required");
    await createTask({
      ...form,
      projectId: id,
    });
    setForm({
      title: "",
      description: "",
      dueDate: "",
    });
    loadTasks();
  };
  const toggleStatus = async (task) => {
    await updateTask(task._id, {
      status: task.status === "Pending" ? "Completed" : "Pending",
    });
    loadTasks();
  };
  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    loadTasks();
  };
  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>
      <div className="bg-gray-50 p-4 rounded-xl mb-6 flex gap-2 flex-wrap">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded flex-1"
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="border p-2 rounded flex-1"
        />
        <input
          type="date"
          value={form.dueDate || ""}
          onChange={(e) =>
            setForm({
              ...form,
              dueDate: e.target.value,
            })
          }
          className="border p-2 rounded"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Add
        </button>
      </div>
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white border p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">{task.title}</h2>
                <p className="text-gray-500">{task.description}</p>

                <p className="text-sm text-gray-400 mt-1">
                  Created: {new Date(task.createdAt).toLocaleString()}
                </p>

                <p className="text-sm text-red-500">
                  Deadline:{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No deadline"}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => toggleStatus(task)}
                  className={`px-3 py-1 rounded ${
                    task.status === "Completed"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400"
                  }`}
                >
                  {task.status}
                </button>

                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
