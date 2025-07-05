import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Destinasi() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    media: { image_url: "" },
    features: { tags: [] },
    rating: "",
    price: "",
    duration: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const navigate = useNavigate();

  // Load from localStorage or fetch from JSON
  useEffect(() => {
    const local = localStorage.getItem("destinasi");
    if (local) {
      setData(JSON.parse(local));
    } else {
      fetch("/data/destinasi.json")
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch((err) => console.error("Gagal fetch destinasi:", err));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("destinasi", JSON.stringify(data));
  }, [data]);

  // Add or Edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIdx !== null) {
      const updated = [...data];
      updated[editIdx] = form;
      setData(updated);
    } else {
      setData([...data, form]);
    }
    setForm({
      name: "",
      location: "",
      description: "",
      media: { image_url: "" },
      features: { tags: [] },
      rating: "",
      price: "",
      duration: ""
    });
    setShowForm(false);
    setEditIdx(null);
  };

  // Delete
  const handleDelete = (idx) => {
    if (window.confirm("Hapus destinasi ini?")) {
      setData(data.filter((_, i) => i !== idx));
    }
  };

  // Edit
  const handleEdit = (idx) => {
    setForm(data[idx]);
    setEditIdx(idx);
    setShowForm(true);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Destinasi Wisata</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
          onClick={() => {
            setShowForm(true);
            setForm({
              name: "",
              location: "",
              description: "",
              media: { image_url: "" },
              features: { tags: [] },
              rating: "",
              price: "",
              duration: ""
            });
            setEditIdx(null);
          }}
        >
          + Tambah Destinasi
        </button>
      </div>

      {showForm && (
        <form
          className="bg-white rounded-xl shadow p-6 mb-6 max-w-2xl"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Nama</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Lokasi</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-semibold">Deskripsi</label>
              <textarea
                className="border rounded px-3 py-2 w-full"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Gambar (URL)</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.media.image_url}
                onChange={(e) =>
                  setForm({ ...form, media: { image_url: e.target.value } })
                }
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Tag (pisahkan dengan koma)</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.features.tags.join(", ")}
                onChange={(e) =>
                  setForm({
                    ...form,
                    features: {
                      tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                    }
                  })
                }
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Rating</label>
              <input
                className="border rounded px-3 py-2 w-full"
                type="number"
                step="0.1"
                min={0}
                max={5}
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Harga</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Durasi</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded font-semibold"
            >
              {editIdx !== null ? "Simpan Perubahan" : "Tambah"}
            </button>
            <button
              type="button"
              className="bg-gray-200 px-4 py-2 rounded"
              onClick={() => {
                setShowForm(false);
                setEditIdx(null);
              }}
            >
              Batal
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl shadow">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left">Gambar</th>
              <th className="py-3 px-4 text-left">Nama</th>
              <th className="py-3 px-4 text-left">Lokasi</th>
              <th className="py-3 px-4 text-left">Deskripsi</th>
              <th className="py-3 px-4 text-left">Tag</th>
              <th className="py-3 px-4 text-left">Rating</th>
              <th className="py-3 px-4 text-left">Harga</th>
              <th className="py-3 px-4 text-left">Durasi</th>
              <th className="py-3 px-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={item.id || idx}
                className="hover:bg-blue-50 cursor-pointer transition"
              >
                <td className="py-2 px-4">
                  <img
                    src={item.media?.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                </td>
                <td className="py-2 px-4 font-semibold text-blue-800">
                  {item.name}
                </td>
                <td className="py-2 px-4">{item.location}</td>
                <td className="py-2 px-4 max-w-xs truncate">
                  {item.description}
                </td>
                <td className="py-2 px-4">
                  <div className="flex flex-wrap gap-1">
                    {item.features?.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-2 px-4 text-yellow-500 font-semibold">
                  {item.rating}
                </td>
                <td className="py-2 px-4 text-green-700 font-semibold">
                  {item.price}
                </td>
                <td className="py-2 px-4">{item.duration}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button
                    className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs font-semibold mr-2"
                    onClick={() => {
                      setShowForm(true);
                      setForm(item);
                      setEditIdx(idx);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold"
                    onClick={() => handleDelete(idx)}
                  >
                    Hapus
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold ml-2"
                    onClick={() => navigate(`/detaildestinasi/${idx}`)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
