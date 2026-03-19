import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../Api";
import AdminNavbar from "../../components/AdminNavbar";

export default function EditGiftBox() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "GiftBox",
    price: "",
    offer: "",
    stock: "",
    mainImage: "",
    subImages: [],
  });

  const [subImageInput, setSubImageInput] = useState("");

  /* LOAD GIFTBOX */
  useEffect(() => {
    const loadGiftBox = async () => {
      try {
        const res = await Api.get(`/giftbox/${id}`);
        setForm({
          ...res.data,
          subImages: res.data.subImages || [],
        });
      } catch (error) {
        alert("❌ Failed to load gift box");
        console.error(error);
      }
    };
    loadGiftBox();
  }, [id]);

  /* ADD SUB IMAGE */
  const addSubImage = () => {
    if (!subImageInput.trim()) return;
    setForm({
      ...form,
      subImages: [...form.subImages, subImageInput],
    });
    setSubImageInput("");
  };

  /* REMOVE SUB IMAGE */
  const removeSubImage = (index) => {
    setForm({
      ...form,
      subImages: form.subImages.filter((_, i) => i !== index),
    });
  };

  /* SUBMIT UPDATE */
  const submit = async (e) => {
    e.preventDefault();
    try {
      await Api.put(`/giftbox/${id}`, {
        ...form,
        price: Number(form.price),
        offer: Number(form.offer),
        stock: Number(form.stock),
      });
      alert("🎁 GiftBox Updated Successfully");
      navigate("/admin/products");
    } catch (error) {
      alert("❌ Failed to update gift box");
      console.error(error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-xl shadow border-t-4 border-orange-500">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          ✏️ Edit Gift Box
        </h1>

        <form onSubmit={submit}>
          <table className="w-full border border-gray-200">
            <tbody>

              {/* NAME */}
              <tr className="border-b">
                <td className="p-3 font-semibold text-blue-600 w-1/3">
                  Gift Box Name
                </td>
                <td className="p-3">
                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                    required
                  />
                </td>
              </tr>

              {/* CATEGORY */}
              <tr className="border-b">
                <td className="p-3 font-semibold text-blue-600">
                  Category
                </td>
                <td className="p-3">
                  <input
                    value={form.category}
                    disabled
                    className="w-full border p-2 rounded bg-gray-100"
                  />
                </td>
              </tr>

              {/* PRICE */}
              <tr className="border-b">
                <td className="p-3 font-semibold text-blue-600">
                  Price
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                    required
                  />
                </td>
              </tr>

              {/* OFFER */}
              <tr className="border-b">
                <td className="p-3 font-semibold text-blue-600">
                  Offer Price
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    value={form.offer}
                    onChange={(e) =>
                      setForm({ ...form, offer: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                </td>
              </tr>

              {/* STOCK */}
              <tr className="border-b">
                <td className="p-3 font-semibold text-blue-600">
                  Stock
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                    required
                  />
                </td>
              </tr>

              {/* MAIN IMAGE */}
              <tr className="border-b">
                <td className="p-3 font-semibold text-blue-600">
                  Main Image URL
                </td>
                <td className="p-3">
                  <input
                    value={form.mainImage}
                    onChange={(e) =>
                      setForm({ ...form, mainImage: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                    required
                  />
                </td>
              </tr>

              {/* SUB IMAGES */}
              <tr>
                <td className="p-3 font-semibold text-blue-600 align-top">
                  Sub Images
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <input
                      value={subImageInput}
                      onChange={(e) => setSubImageInput(e.target.value)}
                      className="flex-1 border p-2 rounded"
                      placeholder="Enter image URL"
                    />
                    <button
                      type="button"
                      onClick={addSubImage}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded"
                    >
                      Add
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                    {form.subImages.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={img}
                          alt="sub"
                          className="h-24 w-full object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removeSubImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white px-2 rounded"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>

            </tbody>
          </table>

          {/* SAVE BUTTON */}
          <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-bold">
            Save Gift Box
          </button>
        </form>
      </div>
    </>
  );
}
