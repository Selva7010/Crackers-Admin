import { Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import AdminLogin from "./pages/auth/AdminLogin";
import AdminRegister from "./pages/auth/AdminRegister"


/* ADMIN */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AddCrackers from "./pages/admin/AddCrackers";
import EditCrackers from "./pages/admin/EditCrackers";
import AddGiftBox from "./pages/admin/AddGiftBox";
import EditGiftBox from "./pages/admin/EditGiftBox";



export default function App() {
  return (
    <Routes>
      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/admin/login" />} />

      {/* ADMIN AUTH */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister/>} />

      {/* ADMIN */}
      <Route path="/admin/admindashboard" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/add-cracker" element={<AddCrackers />} />
      <Route path="/admin/edit-cracker/:id" element={<EditCrackers />} />
      <Route path="/admin/add-giftbox" element={<AddGiftBox />} />
      <Route path="/admin/edit-giftbox/:id" element={<EditGiftBox />} />

      {/* FALLBACK */}
      <Route path="*" element={<h1 className="p-10">404 Page Not Found</h1>} />
    </Routes>
  );
}
