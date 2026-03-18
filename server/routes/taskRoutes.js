import express from "express";
import {
  createTask,
  getProjectTasks,
  updateTask,
  deleteTask,
} from "../controller/taskController.js";
import { verifyUser } from "../helper/userAuth.js";

const router = express.Router();

router.post("/", verifyUser, createTask);
router.get("/project/:projectId", verifyUser, getProjectTasks);
router.put("/:id", verifyUser, updateTask);
router.delete("/:id", verifyUser, deleteTask);

export default router;