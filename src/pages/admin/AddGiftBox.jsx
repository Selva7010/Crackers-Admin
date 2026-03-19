import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Api";
import AdminNavbar from "../../components/AdminNavbar";

const EMPTY = {
  name: "",
  category: "Giftbox",
  price: "",
  offer: "",
  stock: "",
  mainImage: "",
};

export default function AddGiftBox() {
  const [form, setForm] = useState(EMPTY);
  const [subImageInput, setSubImageInput] = useState("");
  const [subImages, setSubImages] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addSubImage = () => {
    if (!subImageInput.trim()) return;
    setSubImages([...subImages, subImageInput.trim()]);
    setSubImageInput("");
  };

  const removeSubImage = (index) => {
    setSubImages(subImages.filter((_, i) => i !== index));
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await Api.post("/giftbox", {
        ...form,
        subImages,
      });
      alert("🎁 GiftBox Added Successfully");
      navigate("/admin/products");
    } catch (error) {
      alert("❌ Failed to add GiftBox");
      console.error(error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow mt-8">
        <h1 className="text-2xl font-bold text-orange-500 mb-6 text-center">
          ➕ Add New Gift Box
        </h1>

        <form onSubmit={submit} className="space-y-5">
          {/* GIFTBOX NAME */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              GiftBox Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter giftbox name"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Category
            </label>
            <input
              name="category"
              value={form.category}
              disabled
              className="w-full p-3 border rounded bg-gray-100"
            />
          </div>

          {/* PRICE & OFFER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Original Price (₹)
              </label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Offer Price (₹)
              </label>
              <input
                name="offer"
                type="number"
                value={form.offer}
                onChange={handleChange}
                placeholder="Enter offer price"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* STOCK */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Available Stock
            </label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* MAIN IMAGE */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Main Image URL
            </label>
            <input
              name="mainImage"
              value={form.mainImage}
              onChange={handleChange}
              placeholder="Enter main image URL"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* SUB IMAGES */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Sub Images (Multiple)
            </label>

            <div className="flex gap-2">
              <input
                value={subImageInput}
                onChange={(e) => setSubImageInput(e.target.value)}
                placeholder="Enter sub image URL"
                className="flex-1 p-3 border rounded focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="button"
                onClick={addSubImage}
                className="px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
              >
                ➕ Add
              </button>
            </div>

            {/* SUB IMAGE LIST */}
            {subImages.length > 0 && (
              <div className="mt-3 space-y-2">
                {subImages.map((img, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-100 p-2 rounded"
                  >
                    <span className="text-sm truncate">{img}</span>
                    <button
                      type="button"
                      onClick={() => removeSubImage(i)}
                      className="text-red-500 font-bold"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600
            text-white py-3 rounded font-bold text-lg transition"
          >
            Save GiftBox
          </button>
        </form>
      </div>
    </>
  );
}
