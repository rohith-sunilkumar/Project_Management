import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  getMe
} from "../controller/userController.js";
import { verifyUser } from "../helper/userAuth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(verifyUser,logout);
router.route('/me').get(getMe)

export default router;
