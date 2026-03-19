import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Api";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("Login Successfully!");
    try {
      
      const res = await Api.post("/admin/Login", form);
      if (!res.data.token) return setMsg("Login failed");

      navigate("/admin/admindashboard");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
       p-6  text-white">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 rounded-2xl 
        border border-black shadow-xl"
      >
        {/* Heading */}
        <h2 className="text-center text-red-500 text-3xl font-extrabold mb-2">
          Admin Login
        </h2>
        <p className="text-center text-orange-500 mb-6 text-sm">
          Access your admin dashboard securely
        </p>

        {/* Message */}
        {msg && (
          <p className="text-green-500 text-center mb-4 font-medium">
            {msg}
          </p>
        )}

        {/* Username */}
        <div className="mb-5">
          <label className="block text-black font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="w-full p-3 border rounded-lg border-black text-black"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-black font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full p-3 border rounded-lg border-black text-black"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 text-black bg-orange-400 hover:bg-orange-500 cursor-pointer font-bold rounded-lg">
          Login
        </button>
        <p className="text-center mt-6 text-sm text-orange-500">
          If you want to user?{" "}
          <Link to="/admin/register" className="text-black cursor-pointer font-semibold hover:underline">Register Here</Link>
        </p>
      </form>
    </div>
  );
}
