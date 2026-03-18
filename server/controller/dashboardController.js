import Project from "../model/projectModel.js";
import Task from "../model/taskModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;
    // total projects of user
    const totalProjects = await Project.countDocuments({
      user: userId,
    });
    // get user's project ids
    const projects = await Project.find({ user: userId }).select("_id");
    const projectIds = projects.map(p => p._id);
    // total tasks in user's projects
    const totalTasks = await Task.countDocuments({
      project: { $in: projectIds }
    });
    // completed tasks
    const completedTasks = await Task.countDocuments({
      project: { $in: projectIds },
      status: "Completed"
    });
    // pending tasks
    const pendingTasks = await Task.countDocuments({
      project: { $in: projectIds },
      status: "Pending"
    });
    res.status(200).json({
      success: true,
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Dashboard stats cannot be fetched"
    });

  }
};