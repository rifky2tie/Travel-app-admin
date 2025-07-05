import React, { useEffect, useState } from "react";

export default function AboutUs() {
  const [about, setAbout] = useState({
    title: "About Us",
    description1:
      "GoTravel.com adalah platform pemesanan perjalanan terpercaya yang menghadirkan pengalaman liburan yang mudah, aman, dan menyenangkan. Kami menyediakan layanan pemesanan tiket pesawat, hotel, paket tour, serta berbagai kebutuhan perjalanan lainnya dalam satu tempat.",
    description2:
      "Dengan dukungan layanan pelanggan 24 jam dan mitra terpercaya di seluruh dunia, GoTravel.com memastikan perjalanan Anda berjalan lancar dari awal hingga akhir. Jelajahi destinasi impian Anda bersama kami hari ini!",
    company: {
      name: "GoTravel",
      address: "Jl. Umban Sari No. 23, Rumbai, Indonesia",
      location: "Rumbai, Pekanbaru, Indonesia"
    }
  });
  const [form, setForm] = useState(about);
  const [editMode, setEditMode] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const local = localStorage.getItem("aboutus");
    if (local) {
      setAbout(JSON.parse(local));
      setForm(JSON.parse(local));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("aboutus", JSON.stringify(about));
  }, [about]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAbout(form);
    setEditMode(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8 mt-10">
      {!editMode ? (
        <>
          <h1 className="text-3xl font-bold text-blue-600 mb-4">{about.title}</h1>
          <p className="text-gray-700 mb-4">{about.description1}</p>
          <p className="text-gray-700 mb-6">{about.description2}</p>
          <div className="bg-blue-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-blue-500 mb-2">Informasi Perusahaan</h2>
            <div className="text-gray-700">
              <div className="mb-1">
                <span className="font-semibold">Nama:</span> {about.company.name}
              </div>
              <div className="mb-1">
                <span className="font-semibold">Alamat:</span> {about.company.address}
              </div>
              <div className="mb-1">
                <span className="font-semibold">Lokasi:</span> {about.company.location}
              </div>
            </div>
          </div>
          <button
            className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded font-semibold"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Judul</label>
            <input
              className="border rounded px-3 py-2 w-full"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Deskripsi 1</label>
            <textarea
              className="border rounded px-3 py-2 w-full"
              value={form.description1}
              onChange={e => setForm({ ...form, description1: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Deskripsi 2</label>
            <textarea
              className="border rounded px-3 py-2 w-full"
              value={form.description2}
              onChange={e => setForm({ ...form, description2: e.target.value })}
              required
            />
          </div>
          <div className="bg-blue-50 rounded-xl p-6 mb-4">
            <h2 className="text-xl font-semibold text-blue-500 mb-2">Informasi Perusahaan</h2>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Nama</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.company.name}
                onChange={e =>
                  setForm({ ...form, company: { ...form.company, name: e.target.value } })
                }
                required
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Alamat</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.company.address}
                onChange={e =>
                  setForm({ ...form, company: { ...form.company, address: e.target.value } })
                }
                required
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Lokasi</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.company.location}
                onChange={e =>
                  setForm({ ...form, company: { ...form.company, location: e.target.value } })
                }
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded font-semibold"
            >
              Simpan
            </button>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-semibold"
              onClick={() => setEditMode(false)}
            >
              Batal
            </button>
          </div>
        </form>
      )}
    </div>
  );
}