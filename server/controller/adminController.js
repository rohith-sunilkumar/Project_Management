import User from "../model/userModel.js";
import Project from "../model/projectModel.js";
import Task from "../model/taskModel.js";

export const getusers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ success: true, message: "Fetched All Users", users });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot fetch users",
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("user", "name email");
    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot fetch projects",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User cannot be deleted",
    });
  }
};

export const getAdminDashboard = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const projects = await Project.countDocuments();
    const tasks = await Task.countDocuments();
    const completed = await Task.countDocuments({
      status: "Completed",
    });

    res.status(200).json({
      success: true,
      stats: {
        users,
        projects,
        tasks,
        completed,
      },
    });
  } catch (error) {
    console.log("ADMIN DASHBOARD ERROR:", error); // 👈 IMPORTANT
    res.status(500).json({
      success: false,
      message: "Dashboard error",
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate({
      path: "project",
      select: "title user",
      populate: {
        path: "user",
        select: "name email",
      },
    });
    console.log(JSON.stringify(tasks, null, 2));
    console.log(tasks); // 🔥 CHECK THIS IN TERMINAL

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching tasks",
    });
  }
};
