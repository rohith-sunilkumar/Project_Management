import express from "express";
import {
  getAllUsers,
  getAllProjects,
  getAllTasks,
  deleteUser,
  getAdminDashboard,
} from "../controller/adminController.js";

import { verifyUser, roleBasedAccess } from "../helper/userAuth.js";

const router = express.Router();

router.get("/users", verifyUser, roleBasedAccess("admin"), getAllUsers);
router.get("/projects", verifyUser, roleBasedAccess("admin"), getAllProjects);
router.get("/tasks", verifyUser, roleBasedAccess("admin"), getAllTasks);
router.delete("/users/:id", verifyUser, roleBasedAccess("admin"), deleteUser);
router.get("/dashboard", verifyUser, roleBasedAccess("admin"),getAdminDashboard);

export default router;