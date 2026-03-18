import User from "../model/userModel.js";
import { sendToken } from "../helper/token.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }
    const user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: "temp_id", url: "temp_url" },
    });
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "User not Registered" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "Email and Password are Required" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const isValidePassword = await user.verifyPassword(password);
    if (!isValidePassword) {
      return res
        .status(401)
        .json({ success: false, message: "Password not Match" });
    }
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "User Cannot Login" });
  }
};

export const logout = async (req, res) => {
  const option = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };
  res.cookie("Token", null, option);
  res.status(200).json({ success: true, message: "Successfully logged Out" });
};

export const getMe = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
