import { registerUser ,loginUser} from "../api/authApi";

export const handleRegister = async (form, navigate) => {
  try {
    const res = await registerUser(form);
    alert("Registered Successfully");
    navigate("/");
  } catch (error) {
    alert(error.response?.data?.message || "Error");
  }
};

export const handleLogin = async (form, navigate, setUser) => {
  try {
    const res = await loginUser(form);
    const user = res.data.user;
    setUser(user);
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  } catch (error) {
    alert("Login failed");
  }
};