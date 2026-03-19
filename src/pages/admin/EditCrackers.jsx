// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Api from "../../Api";
// import AdminNavbar from "../../components/AdminNavbar";

// /* PREDEFINED CATEGORIES */
// const CATEGORIES = [
//   "Single Sound Crackers",
//   "Chakkars",
//   "Flower pots",
//   "Sparklers",
//   "Multi color shots",
//   "Bombs",
//   "Bijili",
//   "Rockets",
//   "Kids"
// ];

// const EMPTY = {
//   name: "",
//   category: "",
//   price: "",
//   offer: "",
//   stock: "",
//   image: "",
// };

// export default function EditCrackers() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [form, setForm] = useState(EMPTY);
//   const [loading, setLoading] = useState(true);

//   /* LOAD CRACKER DATA */
//   useEffect(() => {
//     const loadCracker = async () => {
//       try {
//         const res = await Api.get(`/crackers/${id}`);
//         setForm({
//           name: res.data.name || "",
//           category: res.data.category || "",
//           price: res.data.price || "",
//           offer: res.data.offer || "",
//           stock: res.data.stock || "",
//           image: res.data.image || "",
//         });
//         setLoading(false);
//       } catch (error) {
//         alert("❌ Failed to load cracker data");
//         console.error(error);
//       }
//     };
//     loadCracker();
//   }, [id]);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   /* SUBMIT UPDATE */
//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       await Api.put(`/crackers/${id}`, {
//         ...form,
//         price: Number(form.price),
//         offer: Number(form.offer),
//         stock: Number(form.stock),
//       });

//       alert("✅ Cracker Updated Successfully");
//       navigate("/admin/products");
//     } catch (error) {
//       alert("❌ Failed to update cracker");
//       console.error(error);
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <AdminNavbar />
//         <div className="text-center mt-10 text-blue-600 font-semibold">
//           Loading...
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AdminNavbar />

//       <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow mt-8 border-t-4 border-orange-500">
//         <h1 className="text-2xl font-bold text-blue-600 mb-6">
//           ✏️ Edit Cracker
//         </h1>

//         <form onSubmit={submit} className="space-y-4">

//           {/* NAME */}
//           <div>
//             <label className="block text-sm font-semibold text-blue-600 mb-1">
//               Cracker Name
//             </label>
//             <input
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
//               required
//             />
//           </div>

//           {/* CATEGORY */}
//           <div>
//             <label className="block text-sm font-semibold text-blue-600 mb-1">
//               Category
//             </label>
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
//               required
//             >
//               <option value="">Select Category</option>
//               {CATEGORIES.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* PRICE & OFFER */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-blue-600 mb-1">
//                 Price
//               </label>
//               <input
//                 name="price"
//                 type="number"
//                 value={form.price}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-blue-600 mb-1">
//                 Offer Price
//               </label>
//               <input
//                 name="offer"
//                 type="number"
//                 value={form.offer}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
//               />
//             </div>
//           </div>

//           {/* STOCK */}
//           <div>
//             <label className="block text-sm font-semibold text-blue-600 mb-1">
//               Stock
//             </label>
//             <input
//               name="stock"
//               type="number"
//               value={form.stock}
//               onChange={handleChange}
//               className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
//               required
//             />
//           </div>

//           {/* IMAGE */}
//           <div>
//             <label className="block text-sm font-semibold text-blue-600 mb-1">
//               Image URL
//             </label>
//             <input
//               name="image"
//               value={form.image}
//               onChange={handleChange}
//               className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
//               required
//             />
//           </div>

//           {/* BUTTON */}
//           <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-bold transition">
//             Save Changes
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export default function EditCrackers() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);

  /* LOAD CRACKER DATA */
  useEffect(() => {
    const loadCracker = async () => {
      try {
        const res = await Api.get(`/crackers/${id}`);

        setForm({
          name: res.data.name || "",
          category: res.data.category || "",
          description: res.data.description || "",
          price: res.data.price || "",
          offer: res.data.offer || "",
          stock: res.data.stock || "",
          image: res.data.image || ""
        });

        setLoading(false);
      } catch (error) {
        alert("❌ Failed to load cracker data");
        console.error(error);
      }
    };

    loadCracker();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* SUBMIT UPDATE */
  const submit = async (e) => {
    e.preventDefault();

    try {
      await Api.put(`/crackers/${id}`, {
        ...form,
        price: Number(form.price),
        offer: Number(form.offer) || 0,
        stock: Number(form.stock)
      });

      alert("✅ Cracker Updated Successfully");
      navigate("/admin/products");
    } catch (error) {
      alert("❌ Failed to update cracker");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="text-center mt-10 text-blue-600 font-semibold">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow mt-8 border-t-4 border-orange-500">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          ✏️ Edit Cracker
        </h1>

        <form onSubmit={submit} className="space-y-4">

          {/* NAME */}
          <div>
            <label className="block text-sm font-semibold text-blue-600 mb-1">
              Cracker Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-semibold text-blue-600 mb-1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
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
            <label className="block text-sm font-semibold text-blue-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter cracker description"
              className="w-full p-3 border rounded resize-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* PRICE & OFFER */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-blue-600 mb-1">
                Price
              </label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-600 mb-1">
                Offer Price
              </label>
              <input
                name="offer"
                type="number"
                value={form.offer}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* STOCK */}
          <div>
            <label className="block text-sm font-semibold text-blue-600 mb-1">
              Stock
            </label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-sm font-semibold text-blue-600 mb-1">
              Image URL
            </label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* BUTTON */}
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-bold transition">
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}
