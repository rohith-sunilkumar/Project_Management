import express from "express";
import { getDashboardStats } from "../controller/dashboardController.js";
import { verifyUser } from "../helper/userAuth.js";

const router = express.Router();

router.get("/", verifyUser, getDashboardStats);

export default router;