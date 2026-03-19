import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../Api";
import AdminNavbar from "../../components/AdminNavbar";

export default function AdminProducts() {
  const [crackers, setCrackers] = useState([]);
  const [giftboxes, setGiftboxes] = useState([]);

  const loadData = async () => {
    try {
      const c = await Api.get("/crackers");
      const g = await Api.get("/giftbox");
      setCrackers(c.data);
      setGiftboxes(g.data);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteCracker = async (id) => {
    if (!window.confirm("Delete this cracker?")) return;
    await Api.delete(`/crackers/${id}`);
    loadData();
  };

  const deleteGiftBox = async (id) => {
    if (!window.confirm("Delete this gift box?")) return;
    await Api.delete(`/giftbox/${id}`);
    loadData();
  };

  return (
    <>
      <AdminNavbar />

      <div className="max-w-7xl mx-auto p-6 ml-70 bg-sky-200">
        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mb-6">
          <Link
            to="/admin/add-cracker"
            className="bg-blue-600 text-white px-4 py-2 rounded font-bold"
          >
            ➕ Add Cracker
          </Link>
          <Link
            to="/admin/add-giftbox"
            className="bg-orange-500 text-white px-4 py-2 rounded font-bold"
          >
            🎁 Add GiftBox
          </Link>
        </div>

        {/* CRACKERS */}
        <h2 className="text-xl font-bold text-blue-600 mb-4">Crackers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {crackers.map((c) => (
            <div
              key={c._id}
              className="border rounded-lg shadow p-3 bg-white flex flex-col"
            >
              <img
                src={c.image || "/placeholder.jpg"}
                alt={c.name}
                className="h-32 w-full object-cover rounded"
              />
              <h3 className="font-bold mt-2">{c.name}</h3>
              <p className="text-sm text-gray-600">{c.category}</p>
              <p className="font-semibold mt-1">₹{c.price}</p>
              <p className="text-sm text-gray-600">{c.offer}</p>
              <p className="text-sm text-gray-600">{c.stock}</p>
               

              <div className="flex gap-2 mt-3">
                <Link
                  to={`/admin/edit-cracker/${c._id}`}
                  className="flex-1 bg-blue-500 text-white text-center rounded py-1"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteCracker(c._id)}
                  className="flex-1 bg-red-500 text-white rounded py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* GIFT BOXES */}
        <h2 className="text-xl font-bold text-orange-500 mt-10 mb-4">
          Gift Boxes
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {giftboxes.map((g) => (
            <div
              key={g._id}
              className="border rounded-lg shadow p-3 bg-white flex flex-col"
            >
              {/* USE mainImage OR fallback to first subImage */}
              <img
                src={
                  g.mainImage ||
                  (g.subImages && g.subImages.length > 0
                    ? g.subImages[0]
                    : "/placeholder.jpg")
                }
                alt={g.name}
                className="h-32 w-full object-cover rounded"
              />
              <h3 className="font-bold mt-2">{g.name}</h3>
              <p className="text-sm text-gray-600">{g.category}</p>
              <p className="font-semibold mt-1">₹{g.price}</p>
              <p className="text-sm text-gray-600">{g.offer}</p>
              <p className="text-sm text-gray-600">{g.stock}</p>
              

              <div className="flex gap-2 mt-3">
                <Link
                  to={`/admin/edit-giftbox/${g._id}`}
                  className="flex-1 bg-blue-500 text-white text-center rounded py-1"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteGiftBox(g._id)}
                  className="flex-1 bg-red-500 text-white rounded py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
