
// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Package,
//   ShoppingCart,
//   LogOut
// } from "lucide-react";

// export default function AdminNavbar() {
//   const logout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };

//   const linkClass =
//     "flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition";

//   return (
//     <>
//       {/* MOBILE TOP BAR */}
//       <div className="md:hidden flex justify-between items-center bg-black text-white p-4">
//         <h2 className="font-extrabold text-lg">Admin Panel</h2>
//         <button onClick={logout} className="font-bold">
//           Logout
//         </button>
//       </div>

//       {/* SIDEBAR */}
//       <aside
//         className="hidden md:flex fixed left-0 top-0 h-screen w-64
//        text-black flex-col p-6"
//       >
//         <h1 className="text-2xl font-extrabold mb-8 text-orange-500">
//           🔥 Admin Panel
//         </h1>

//         <nav className="flex flex-col gap-3 flex-1">
//           <NavLink
//             to="/admin/admindashboard"
//             className={({ isActive }) =>
//               `${linkClass} ${
//                 isActive ? "bg-orange-500" : "hover:bg-blue-400"
//               }`
//             }
//           >
//             <LayoutDashboard size={20} />
//             Dashboard
//           </NavLink>

//           <NavLink
//             to="/admin/products"
//             className={({ isActive }) =>
//               `${linkClass} ${
//                 isActive ? "bg-orange-500" : "hover:bg-blue-400"
//               }`
//             }
//           >
//             <Package size={20} />
//             Products
//           </NavLink>

//           <NavLink
//             to="/admin/orders"
//             className={({ isActive }) =>
//               `${linkClass} ${
//                 isActive ? "bg-orange-500" : "hover:bg-blue-400"
//               }`
//             }
//           >
//             <ShoppingCart size={20} />
//             Orders
//           </NavLink>
//         </nav>

//         <button
//           onClick={logout}
//           className="mt-auto bg-red-500 hover:bg-red-600
//           py-3 rounded-lg font-bold cursor-pointer"
//         >
//           <LogOut className="inline mr-2" size={18} />
//           Logout
//         </button>
//       </aside>
//     </>
//   );
// }


import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  Menu,
  X
} from "lucide-react";

export default function AdminNavbar() {
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const linkClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition";

  const navLinks = (
    <>
      <NavLink
        to="/admin/admindashboard"
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `${linkClass} ${
            isActive
              ? "bg-orange-500 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`
        }
      >
        <LayoutDashboard size={20} />
        Dashboard
      </NavLink>

      <NavLink
        to="/admin/products"
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `${linkClass} ${
            isActive
              ? "bg-orange-500 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`
        }
      >
        <Package size={20} />
        Products
      </NavLink>

      <NavLink
        to="/admin/orders"
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `${linkClass} ${
            isActive
              ? "bg-orange-500 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`
        }
      >
        <ShoppingCart size={20} />
        Orders
      </NavLink>
    </>
  );

  return (
    <>
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50
      bg-gray-900 text-white flex items-center justify-between
      px-4 py-3 shadow">
        <button onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>

        <h2 className="font-extrabold text-lg text-orange-500">
          🔥 Admin
        </h2>

        <button onClick={logout}>
          <LogOut size={22} />
        </button>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition
        ${open ? "visible" : "invisible"}`}
      >
        {/* BACKDROP */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 transition
          ${open ? "opacity-100" : "opacity-0"}`}
        />

        {/* DRAWER */}
        <aside
          className={`absolute left-0 top-0 h-full w-64
          bg-gray-900 p-6 transform transition
          ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-extrabold text-orange-500">
              Admin Panel
            </h1>
            <button onClick={() => setOpen(false)}>
              <X size={22} className="text-gray-300" />
            </button>
          </div>

          <nav className="flex flex-col gap-3">{navLinks}</nav>

          <button
            onClick={logout}
            className="mt-8 w-full bg-red-500 hover:bg-red-600
            py-3 rounded-lg font-bold text-white"
          >
            <LogOut className="inline mr-2" size={18} />
            Logout
          </button>
        </aside>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className="hidden md:flex fixed left-0 top-0 h-screen w-64
        bg-gray-900 text-white flex-col p-6 shadow-lg"
      >
        <h1 className="text-2xl font-extrabold mb-8 text-orange-500">
          🔥 Admin Panel
        </h1>

        <nav className="flex flex-col gap-3 flex-1">
          {navLinks}
        </nav>

        <button
          onClick={logout}
          className="mt-auto bg-red-500 hover:bg-red-600
          py-3 rounded-lg font-bold text-white"
        >
          <LogOut className="inline mr-2" size={18} />
          Logout
        </button>
      </aside>

      {/* SPACER FOR DESKTOP CONTENT */}
      <div className="hidden md:block w-64" />
    </>
  );
}
