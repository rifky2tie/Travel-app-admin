import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Guides() {
  const [guides, setGuides] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    noHP: "",
    lokasi: "",
    foto: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const navigate = useNavigate();

  // Load from localStorage or fetch from JSON
  useEffect(() => {
    const local = localStorage.getItem("guides");
    if (local) {
      setGuides(JSON.parse(local));
    } else {
      fetch("/data/guides.json")
        .then((res) => res.json())
        .then((data) => setGuides(data));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (guides.length > 0) {
      localStorage.setItem("guides", JSON.stringify(guides));
    }
  }, [guides]);

  // Add or Edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIdx !== null) {
      const updated = [...guides];
      updated[editIdx] = form;
      setGuides(updated);
    } else {
      setGuides([...guides, form]);
    }
    setForm({ nama: "", email: "", noHP: "", lokasi: "", foto: "" });
    setShowForm(false);
    setEditIdx(null);
  };

  // Delete
  const handleDelete = (idx) => {
    if (window.confirm("Hapus guide ini?")) {
      setGuides(guides.filter((_, i) => i !== idx));
    }
  };

  // Edit
  const handleEdit = (idx) => {
    setForm(guides[idx]);
    setEditIdx(idx);
    setShowForm(true);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 min-h-screen">
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Guides</h1>
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
            onClick={() => {
              setShowForm(true);
              setForm({ nama: "", email: "", noHP: "", lokasi: "", foto: "" });
              setEditIdx(null);
            }}
          >
            + Tambah Guide
          </button>
        </div>
        {showForm && (
          <form
            className="bg-white rounded-xl shadow p-6 mb-6"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold">Nama</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Email</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">No HP</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  value={form.noHP}
                  onChange={(e) => setForm({ ...form, noHP: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Lokasi</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  value={form.lokasi}
                  onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 font-semibold">Foto (URL)</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  value={form.foto}
                  onChange={(e) => setForm({ ...form, foto: e.target.value })}
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
        <div className="space-y-4">
          {guides.map((guide, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/Detailguides/${idx}`)}
              className="flex items-center p-5 rounded-xl shadow-sm bg-white relative cursor-pointer hover:bg-blue-50 transition"
            >
              <img
                src={guide.foto}
                alt={guide.nama}
                className="w-16 h-16 rounded-full object-cover mr-5 border"
              />
              <div className="flex-1">
                <div className="font-bold text-lg">{guide.nama}</div>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <span className="mr-3 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M16 12a4 4 0 01-8 0V8a4 4 0 018 0v4z" />
                      <path d="M12 16v2m0 0a4 4 0 01-4-4h8a4 4 0 01-4 4z" />
                    </svg>
                    {guide.email}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    {guide.noHP}
                  </span>
                </div>
              </div>
              <span className="absolute right-6 top-6 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
                {guide.lokasi}
              </span>
              <div className="absolute right-6 bottom-6 flex gap-2">
                <button
                  className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs font-semibold"
                  onClick={e => {
                    e.stopPropagation();
                    handleEdit(idx);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold"
                  onClick={e => {
                    e.stopPropagation();
                    handleDelete(idx);
                  }}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}