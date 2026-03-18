import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../controllers/authController";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ 
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(form, navigate, setUser);
          }}
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 font-semibold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
