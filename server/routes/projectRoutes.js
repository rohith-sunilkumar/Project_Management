import express from "express";
import {
  createProject,
  getUserProjects,
  updateProject,
  deleteProject,
  getSingleProject,
} from "../controller/projectController.js";
import { verifyUser } from "../helper/userAuth.js";

const router = express.Router();

router.post("/", verifyUser, createProject);
router.get("/", verifyUser, getUserProjects);
router.get("/:id", verifyUser, getSingleProject);
router.put("/:id", verifyUser, updateProject);
router.delete("/:id", verifyUser, deleteProject);

export default router;