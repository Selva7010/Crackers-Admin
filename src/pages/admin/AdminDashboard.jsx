import { useEffect, useState } from "react";
import Api from "../../Api";
import AdminNavbar from "../../components/AdminNavbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const COLORS = ["#fb923c", "#22c55e", "#3b82f6", "#ef4444"];

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const ordersRes = await Api.get("/orders");
    const crackersRes = await Api.get("/crackers");
    const giftboxRes = await Api.get("/giftbox");

    setOrders(ordersRes.data);

    // Total Revenue
    const totalRevenue = ordersRes.data.reduce(
      (sum, o) => sum + o.totalPrice,
      0
    );
    setRevenue(totalRevenue);

    // Total Stock
    const crackerStock = crackersRes.data.reduce(
      (s, c) => s + c.stock,
      0
    );
    const giftboxStock = giftboxRes.data.reduce(
      (s, g) => s + g.stock,
      0
    );
    setStock(crackerStock + giftboxStock);
  };

  /* ================= ORDER STATUS DATA ================= */
  const statusData = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"]
    .map(status => ({
      name: status,
      value: orders.filter(o => o.orderStatus === status).length
    }))
    .filter(s => s.value > 0);

  /* ================= DAILY REVENUE ================= */
  const revenueByDate = Object.values(
    orders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      acc[date] = acc[date] || { date, revenue: 0 };
      acc[date].revenue += order.totalPrice;
      return acc;
    }, {})
  );

  return (
    <div className="flex">
      <AdminNavbar />

      <main className="flex-2 md:ml-64 sm:mt-10 p-6 bg-sky-200 min-h-screen">
        <h1 className="text-3xl font-extrabold mb-8">
          📊 Admin Dashboard
        </h1>

        {/* ================= SUMMARY CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card title="Total Revenue" value={`₹${revenue}`} color="bg-green-500" />
          <Card title="Total Stock" value={stock} color="bg-blue-500" />
          <Card title="Total Orders" value={orders.length} color="bg-orange-500" />
        </div>

        {/* ================= CHARTS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ===== BAR CHART (REVENUE) ===== */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">
              📈 Daily Revenue
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByDate}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#fb923c" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ===== PIE CHART (ORDER STATUS) ===== */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">
              🧾 Order Status
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                >
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ================= CARD ================= */
function Card({ title, value, color }) {
  return (
    <div className={`${color} text-white p-6 rounded-xl shadow`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-extrabold mt-2">{value}</p>
    </div>
  );
}
