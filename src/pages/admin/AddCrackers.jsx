import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Api";
import AdminNavbar from "../../components/AdminNavbar";

/* PREDEFINED CATEGORIES */
const CATEGORIES = [
  "Single Sound Crackers",
  "Chakkars",
  "Flower pots",
  "Sparklers",
  "Multi color shots",
  "Bombs",
  "Bijili",
  "Rockets",
  "Kids"
];

const EMPTY = {
  name: "",
  category: "",
  description: "",
  price: "",
  offer: "",
  stock: "",
  image: ""
};

export default function AddCrackers() {
  const [form, setForm] = useState(EMPTY);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await Api.post("/crackers", {
        ...form,
        price: Number(form.price),
        offer: Number(form.offer) || 0,
        stock: Number(form.stock)
      });

      alert("✅ Cracker Added Successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add cracker");
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* SIDEBAR */}
      <AdminNavbar />

      {/* CONTENT */}
      <div className="flex-1 px-4 sm:px-6 py-6 bg-sky-200">
        <div
          className="
          max-w-3xl mx-auto
          bg-white rounded-2xl shadow-lg
          p-5 sm:p-8
          "
        >
          <h1 className="text-2xl sm:text-3xl font-bold
          text-indigo-600 mb-6 text-center">
            ➕ Add New Cracker
          </h1>

          <form onSubmit={submit} className="space-y-5">

            {/* NAME */}
            <div>
              <label className="block mb-1 font-semibold text-slate-700">
                Cracker Name
              </label>
              <input
                name="name"
                className="
                w-full p-3 rounded-lg border
                focus:ring-2 focus:ring-indigo-400
                outline-none
                "
                onChange={handleChange}
                required
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block mb-1 font-semibold text-slate-700">
                Category
              </label>
              <select
                name="category"
                className="
                w-full p-3 rounded-lg border
                focus:ring-2 focus:ring-indigo-400
                outline-none
                "
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block mb-1 font-semibold text-slate-700">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                placeholder="Enter usage, safety, effects..."
                className="
                w-full p-3 rounded-lg border resize-none
                focus:ring-2 focus:ring-indigo-400
                outline-none
                "
                onChange={handleChange}
              />
            </div>

            {/* PRICE & OFFER */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Original Price (₹)
                </label>
                <input
                  name="price"
                  type="number"
                  className="
                  w-full p-3 rounded-lg border
                  focus:ring-2 focus:ring-indigo-400
                  outline-none
                  "
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Offer Price (₹)
                </label>
                <input
                  name="offer"
                  type="number"
                  className="
                  w-full p-3 rounded-lg border
                  focus:ring-2 focus:ring-indigo-400
                  outline-none
                  "
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* STOCK */}
            <div>
              <label className="block mb-1 font-semibold text-slate-700">
                Available Stock
              </label>
              <input
                name="stock"
                type="number"
                className="
                w-full p-3 rounded-lg border
                focus:ring-2 focus:ring-indigo-400
                outline-none
                "
                onChange={handleChange}
                required
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className="block mb-1 font-semibold text-slate-700">
                Image URL
              </label>
              <input
                name="image"
                className="
                w-full p-3 rounded-lg border
                focus:ring-2 focus:ring-indigo-400
                outline-none
                "
                onChange={handleChange}
                required
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="
              w-full py-3 rounded-xl font-bold text-lg
              bg-orange-500 hover:bg-orange-600
              text-white transition shadow
              "
            >
              Save Cracker
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
