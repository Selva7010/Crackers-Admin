import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Api";
import { Link } from "react-router-dom";

export default function Register(){
  const navigate = useNavigate();
  const [form, setForm] = useState({username: "", password: ""});
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post("/admin/register", form);
      if (!res.data.admin) return setMsg("Registration failed");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.admin));

      setMsg("🎉 Registered Successfully! Redirecting...");

      setTimeout(()=>navigate("/admin/login"), 1000);

    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg 
        p-6 rounded-2xl shadow-lg border border-red-500">

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-center text-red-500 mb-3">
          🎇 Create Your Account
        </h1>

        {/* Sub Content */}
        <p className="text-center text-orange-400 mb-6 text-sm font-semibold">
          Join us and light up your Diwali celebrations with amazing crackers ✨
        </p>

        {/* Message */}
        {msg && (
          <p className="text-yellow-300 text-center font-medium mb-4">
            {msg}
          </p>
        )}

        {/* Form */}
        <form onSubmit={submit} className="space-y-4 ">

          <div>
            <label className="block mb-1 font-medium">Enter Username</label>
            <input 
              value={form.username} 
              onChange={e=>setForm({...form,username:e.target.value})} 
              placeholder="Enter your Username" 
              className="w-full p-3 border rounded-lg border-black text-black"
              required 
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Enter Password</label>
            <input 
              type="password" 
              value={form.password} 
              onChange={e=>setForm({...form,password:e.target.value})} 
              placeholder="Enter your Password" 
              className="w-full p-3 border rounded-lg border-black text-black"
              required 
            />
          </div>


          {/* Button */}
          <button 
            className="w-full py-3 bg-orange-400 hover:bg-orange-500 cursor-pointer font-bold rounded-lg"
          >
             Create Account
          </button>

        </form>

        {/* Login link */}
        <p className="text-center mt-6 text-sm text-red-500">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-black cursor-pointer font-semibold hover:underline">Login Here</Link>
        </p>
      </div>
    </div>
  );
}
