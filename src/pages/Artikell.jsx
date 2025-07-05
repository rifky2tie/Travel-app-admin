import React, { useEffect, useState } from "react";

export default function Artikell() {
  const [artikel, setArtikel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    date: ""
  });

  // Load from localStorage or fetch from JSON
  useEffect(() => {
    const local = localStorage.getItem("artikel");
    if (local) {
      setArtikel(JSON.parse(local));
      setLoading(false);
    } else {
      fetch("/data/artikel.json")
        .then((res) => res.json())
        .then((data) => {
          setArtikel(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (artikel.length > 0) {
      localStorage.setItem("artikel", JSON.stringify(artikel));
    }
  }, [artikel]);

  // Add or Edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIdx !== null) {
      const updated = [...artikel];
      updated[editIdx] = form;
      setArtikel(updated);
    } else {
      setArtikel([...artikel, form]);
    }
    setForm({ title: "", content: "", author: "", date: "" });
    setShowForm(false);
    setEditIdx(null);
  };

  // Delete
  const handleDelete = (idx) => {
    if (window.confirm("Hapus artikel ini?")) {
      setArtikel(artikel.filter((_, i) => i !== idx));
    }
  };

  // Edit
  const handleEdit = (idx) => {
    setForm(artikel[idx]);
    setEditIdx(idx);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-50">
        <span className="text-blue-400 text-lg">Loading...</span>
      </div>
    );
  }

  if (!artikel || artikel.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-50">
        <span className="text-red-400 text-lg">Artikel tidak ditemukan.</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 ">
    <div className="max-w-2xl mx-auto  py-10">
      <div className="flex justify-end mb-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
          onClick={() => {
            setShowForm(true);
            setForm({ title: "", content: "", author: "", date: "" });
            setEditIdx(null);
          }}
        >
          + Tambah Artikel
        </button>
      </div>
      {showForm && (
        <form
          className="bg-white rounded-2xl shadow p-6 mb-8"
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
            <label className="block mb-1 font-semibold">Isi Artikel</label>
            <textarea
              className="border rounded px-3 py-2 w-full"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1 font-semibold">Penulis</label>
            <input
              className="border rounded px-3 py-2 w-full"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1 font-semibold">Tanggal</label>
            <input
              className="border rounded px-3 py-2 w-full"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
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
      {artikel.map((item, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl shadow p-8 mb-8"
        >
          <h1 className="text-2xl font-bold text-blue-700 mb-4">{item.title}</h1>
          <div className="text-gray-700 mb-6">{item.content}</div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              Oleh: <span className="font-semibold text-blue-600">{item.author}</span>
            </span>
            <span>{item.date}</span>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs font-semibold"
              onClick={() => handleEdit(idx)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold"
              onClick={() => handleDelete(idx)}
            >
              Hapus
            </button>
          </div>
        </div>
        
      ))}
    </div>
    </div>
  );
}