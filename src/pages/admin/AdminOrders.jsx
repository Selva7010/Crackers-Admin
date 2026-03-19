import { useEffect, useState } from "react";
import Api from "../../Api";
import AdminNavbar from "../../components/AdminNavbar";

const STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Packed: "bg-purple-100 text-purple-700",
  Shipped: "bg-indigo-100 text-indigo-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700"
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await Api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await Api.put(`/orders/${id}/status`, { orderStatus: status });
      fetchOrders(); // refresh
    } catch (error) {
      alert("Failed to update status",error);
    }
  };

  return (
    <div className="flex ">
      <AdminNavbar />

      <main className="flex-1 md:ml-64 p-4 md:p-8 bg-sky-200 min-h-screen">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800">
          📦 Admin Orders
        </h2>

        {loading && (
          <p className="text-center text-gray-500">Loading orders...</p>
        )}

        {!loading && orders.length === 0 && (
          <p className="text-center text-gray-500">No orders found</p>
        )}

        <div className="space-y-8">
          {orders.map(order => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg p-5"
            >
              {/* ================= CUSTOMER INFO ================= */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div>
                  <p className="font-semibold text-gray-600">Customer</p>
                  <p className="font-bold text-lg">
                    {order.customer_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    📞 {order.customer_mobileNo}
                  </p>
                  <p className="text-sm text-gray-500">
                    📍 {order.customer_address}
                  </p>
                </div>

                <div className="md:text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                    ${STATUS_COLORS[order.orderStatus]}`}
                  >
                    {order.orderStatus}
                  </span>

                  <p className="mt-3 text-xl font-extrabold text-orange-500">
                    Total: ₹{order.totalPrice}
                  </p>
                </div>
              </div>

              {/* ================= PRODUCTS TABLE (DESKTOP) ================= */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border rounded-xl overflow-hidden text-sm">
                  <thead className="bg-slate-200">
                    <tr>
                      <th className="p-3 text-left">Image</th>
                      <th className="p-3 text-left">Product</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3 text-center">Price</th>
                      <th className="p-3 text-center">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.crackers_list.map((p, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-3">
                          <img
                            src={p.image || "/placeholder.jpg"}
                            className="w-12 h-12 rounded object-cover"
                          />
                        </td>
                        <td className="p-3 font-semibold">
                          {p.name}
                        </td>
                        <td className="p-3 text-center">
                          {p.quantity}
                        </td>
                        <td className="p-3 text-center">
                          ₹{p.price}
                        </td>
                        <td className="p-3 text-center font-bold">
                          ₹{p.price * p.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ================= PRODUCTS (MOBILE CARDS) ================= */}
              <div className="md:hidden space-y-3">
                {order.crackers_list.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 border rounded-lg p-3"
                  >
                    <img
                      src={p.image || "/placeholder.jpg"}
                      className="w-14 h-14 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {p.quantity} × ₹{p.price}
                      </p>
                    </div>
                    <p className="font-bold text-orange-500">
                      ₹{p.price * p.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* ================= STATUS CONTROL ================= */}
              <div className="mt-6 flex flex-col md:flex-row md:items-center gap-3">
                <label className="font-semibold text-gray-700">
                  Update Status:
                </label>
                <select
                  value={order.orderStatus}
                  onChange={e =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="border rounded-lg px-4 py-2 focus:ring-2
                  focus:ring-orange-400"
                >
                  {[
                    "Pending",
                    "Confirmed",
                    "Packed",
                    "Shipped",
                    "Delivered",
                    "Cancelled"
                  ].map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
