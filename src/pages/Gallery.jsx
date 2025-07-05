import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy role, ganti sesuai autentikasi aplikasi kamu
const userRole = "admin"; // atau "user"

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", image: "", location: "" });
  const [editIdx, setEditIdx] = useState(null);
  const navigate = useNavigate();

  // Simulasi fetch data dari localStorage (karena tidak bisa write ke public/data di FE)
  useEffect(() => {
    const local = localStorage.getItem("gallery");
    if (local) {
      setGallery(JSON.parse(local));
    } else {
      fetch("/data/gallery.json")
        .then((res) => res.json())
        .then((data) => {
          setGallery(data);
          localStorage.setItem("gallery", JSON.stringify(data));
        });
    }
  }, []);

  // Simpan ke localStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem("gallery", JSON.stringify(gallery));
  }, [gallery]);

  // Handler tambah/edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIdx !== null) {
      // Edit
      const newGallery = [...gallery];
      newGallery[editIdx] = form;
      setGallery(newGallery);
    } else {
      // Tambah
      setGallery([...gallery, form]);
    }
    setShowForm(false);
    setForm({ title: "", image: "", location: "" });
    setEditIdx(null);
  };

  // Handler hapus
  const handleDelete = (idx) => {
    if (window.confirm("Hapus gambar ini?")) {
      setGallery(gallery.filter((_, i) => i !== idx));
    }
  };

  // Handler edit
  const handleEdit = (idx) => {
    setForm(gallery[idx]);
    setEditIdx(idx);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gallery</h1>
        {userRole === "admin" && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
            onClick={() => {
              setShowForm(true);
              setForm({ title: "", image: "", location: "" });
              setEditIdx(null);
            }}
          >
            + Tambah Gambar
          </button>
        )}
      </div>

      {/* Form Tambah/Edit */}
      {showForm && userRole === "admin" && (
        <form
          className="bg-white rounded-xl shadow p-6 mb-6 max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label className="block mb-1 font-semibold">Judul</label>
            <input
              className="border rounded px-3 py-2 w-full"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1 font-semibold">URL Gambar</label>
            <input
              className="border rounded px-3 py-2 w-full"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1 font-semibold">Lokasi</label>
            <input
              className="border rounded px-3 py-2 w-full"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
          </div>
          <div className="flex gap-2">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow overflow-hidden flex flex-col cursor-pointer hover:bg-blue-50 transition group"
            onClick={() => navigate(`/detailgallery/${idx}`)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <div className="font-semibold text-base mb-1">{item.title}</div>
              <div className="text-gray-500 text-sm flex items-center mb-1">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" />
                  <path d="M15 11a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {item.location}
              </div>
              <div className="text-gray-400 text-xs mt-auto">...</div>
              {userRole === "admin" && (
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    className="bg-blue-400 text-white px-3 py-1 rounded text-xs font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(idx);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(idx);
                    }}
                  >
                    Hapus
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination & Footer */}
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Showing</span>
          <select className="border rounded px-2 py-1">
            <option>12</option>
          </select>
          <span>out of {gallery.length}</span>
        </div>
        <div className="flex items-center space-x-1">
          <button className="px-3 py-1 rounded bg-gray-100 text-gray-600">&lt; Previous</button>
          <button className="px-3 py-1 rounded bg-blue-500 text-white">1</button>
          <button className="px-3 py-1 rounded bg-gray-100 text-gray-600">2</button>
          <button className="px-3 py-1 rounded bg-gray-100 text-gray-600">3</button>
          <span className="px-2">...</span>
          <button className="px-3 py-1 rounded bg-gray-100 text-gray-600">16</button>
          <button className="px-3 py-1 rounded bg-gray-100 text-gray-600">Next &gt;</button>
        </div>
      </div>
    </div>
  );
}