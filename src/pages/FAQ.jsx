import React, { useEffect, useState } from "react";

export default function FAQ() {
  const [faq, setFaq] = useState([]);
  const [openIdx, setOpenIdx] = useState(null);
  const [form, setForm] = useState({ category: "", question: "", answer: "" });
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [error, setError] = useState(null);

  // Load from localStorage or fetch from JSON with error handling
  useEffect(() => {
    const local = localStorage.getItem("faq");
    if (local && local !== "[]") {
      setFaq(JSON.parse(local));
    } else {
      fetch("/data/faq.json")
        .then((res) => {
          if (!res.ok) throw new Error("Gagal memuat data FAQ");
          return res.json();
        })
        .then((data) => setFaq(data))
        .catch(() => setError("Gagal memuat data FAQ. Pastikan file faq.json tersedia."));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (faq.length > 0) {
      localStorage.setItem("faq", JSON.stringify(faq));
    }
  }, [faq]);

  // Add or Edit FAQ
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIdx !== null) {
      const updated = [...faq];
      updated[editIdx] = form;
      setFaq(updated);
    } else {
      setFaq([...faq, form]);
    }
    setForm({ category: "", question: "", answer: "" });
    setShowForm(false);
    setEditIdx(null);
  };

  // Delete FAQ
  const handleDelete = (idx) => {
    if (window.confirm("Hapus pertanyaan ini?")) {
      setFaq(faq.filter((_, i) => i !== idx));
    }
  };

  // Edit FAQ
  const handleEdit = (idx) => {
    setForm(faq[idx]);
    setEditIdx(idx);
    setShowForm(true);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-0 m-0">
      <div className="w-full bg-white rounded-none shadow-none p-0 mt-0">
        <div className="flex items-center justify-between px-8 pt-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Frequently Asked Questions</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded font-semibold"
            onClick={() => {
              setShowForm(true);
              setForm({ category: "", question: "", answer: "" });
              setEditIdx(null);
            }}
          >
            + Tambah FAQ
          </button>
        </div>
        {showForm && (
          <form
            className="bg-blue-50 rounded-xl p-6 mx-8 mb-6"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Kategori</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Pertanyaan</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Jawaban</label>
              <textarea
                className="border rounded px-3 py-2 w-full"
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
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
        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}
        {!error && faq.length === 0 && (
          <div className="text-gray-400 text-center">Loading...</div>
        )}
        <div className="space-y-4 px-8 pb-8">
          {faq.map((item, idx) => (
            <div key={idx} className="border-b pb-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <div>
                  <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded mr-2">
                    {item.category}
                  </span>
                  <span className="font-medium text-gray-800">{item.question}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400 text-xl select-none">
                    {openIdx === idx ? "−" : "+"}
                  </span>
                  <button
                    className="text-xs text-yellow-600 px-2 py-1 rounded hover:bg-yellow-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(idx);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-xs text-red-600 px-2 py-1 rounded hover:bg-red-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(idx);
                    }}
                  >
                    Hapus
                  </button>
                </div>
              </div>
              {openIdx === idx && (
                <div className="mt-2 text-gray-700 whitespace-pre-line">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}