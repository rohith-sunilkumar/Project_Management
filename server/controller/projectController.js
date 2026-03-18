import Project from "../model/projectModel.js";

export const createProject = async (req, res) => {
  const project = await Project.create({
    title: req.body.title,
    description: req.body.description,
    user: req.user._id,
    dueDate: req.body.dueDate,
  });
  console.log(project);
  
  res.status(201).json({
    success: true,
    project,
  });
};

export const getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Projects cannot be fetched",
    });
  }
};

export const getSingleProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }
    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot fetch project"
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }
    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Project cannot be updated"
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Project cannot be deleted"
    });

  }
};