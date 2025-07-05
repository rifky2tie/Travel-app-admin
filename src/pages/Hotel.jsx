import React, { useEffect, useState } from "react";

export default function Hotel() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    no_hp: "",
    tgl_checkin: "",
    tgl_checkout: "",
    jumlah_kamar: "",
    jumlah_orang: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState(null);

  // Load from localStorage or fetch from JSON
  useEffect(() => {
    const local = localStorage.getItem("hotel");
    if (local) {
      setData(JSON.parse(local));
    } else {
      fetch("/data/hotel.json")
        .then((res) => res.json())
        .then((d) => setData(d));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("hotel", JSON.stringify(data));
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
      nama: "",
      email: "",
      no_hp: "",
      tgl_checkin: "",
      tgl_checkout: "",
      jumlah_kamar: "",
      jumlah_orang: ""
    });
    setShowForm(false);
    setEditIdx(null);
  };

  // Delete
  const handleDelete = (idx) => {
    if (window.confirm("Hapus data ini?")) {
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
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">Daftar Hotel</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow"
          onClick={() => {
            setShowForm(true);
            setForm({
              nama: "",
              email: "",
              no_hp: "",
              tgl_checkin: "",
              tgl_checkout: "",
              jumlah_kamar: "",
              jumlah_orang: ""
            });
            setEditIdx(null);
          }}
        >
          + Tambah Data
        </button>
      </div>

      {showForm && (
        <form
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 max-w-2xl border border-blue-100"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-semibold ">Nama</label>
              <input
                className="border border-blue-200 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-300"
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold ">Email</label>
              <input
                className="border border-blue-200 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-300"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold ">No HP</label>
              <input
                className="border border-blue-200 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-300"
                value={form.no_hp}
                onChange={(e) => setForm({ ...form, no_hp: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold ">Tanggal Check-in</label>
              <input
                className="border border-blue-200 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-300"
                type="date"
                value={form.tgl_checkin}
                onChange={(e) => setForm({ ...form, tgl_checkin: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold ">Tanggal Check-out</label>
              <input
                className="border border-blue-200 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-300"
                type="date"
                value={form.tgl_checkout}
                onChange={(e) => setForm({ ...form, tgl_checkout: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold ">Jumlah Kamar</label>
              <input
                className="border border-blue-200 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-300"
                type="number"
                min={1}
                value={form.jumlah_kamar}
                onChange={(e) => setForm({ ...form, jumlah_kamar: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold ">Jumlah Orang</label>
              <input
                className="border border-blue-200 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-300"
                type="number"
                min={1}
                value={form.jumlah_orang}
                onChange={(e) => setForm({ ...form, jumlah_orang: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow"
            >
              {editIdx !== null ? "Simpan Perubahan" : "Tambah"}
            </button>
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold"
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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-blue-200 rounded-2xl shadow-lg text-base">
          <thead>
            <tr className="bg-blue-100 text-blue-800">
              <th className="py-3 px-4 border-b border-blue-200 text-left rounded-tl-2xl">No</th>
              <th className="py-3 px-4 border-b border-blue-200 text-left">Nama</th>
              <th className="py-3 px-4 border-b border-blue-200 text-left">Email</th>
              <th className="py-3 px-4 border-b border-blue-200 text-left">No HP</th>
              <th className="py-3 px-4 border-b border-blue-200 text-left">Check-in</th>
              <th className="py-3 px-4 border-b border-blue-200 text-left">Check-out</th>
              <th className="py-3 px-4 border-b border-blue-200 text-left">Jumlah Kamar</th>
              <th className="py-3 px-4 border-b border-blue-200 text-left">Jumlah Orang</th>
              <th className="py-3 px-4 border-b border-blue-200 text-left rounded-tr-2xl">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={idx}
                className={`border-b border-blue-100 ${idx % 2 === 0 ? "bg-blue-50" : "bg-white"} hover:bg-blue-200 transition`}
              >
                <td className="py-2 px-4">{idx + 1}</td>
                <td className="py-2 px-4">{item.nama}</td>
                <td className="py-2 px-4">{item.email}</td>
                <td className="py-2 px-4">{item.no_hp}</td>
                <td className="py-2 px-4">{item.tgl_checkin}</td>
                <td className="py-2 px-4">{item.tgl_checkout}</td>
                <td className="py-2 px-4">{item.jumlah_kamar}</td>
                <td className="py-2 px-4">{item.jumlah_orang}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button
                    className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs font-semibold mr-2 shadow"
                    onClick={() => handleEdit(idx)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold shadow"
                    onClick={() => handleDelete(idx)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-6 text-blue-400">
                  Tidak ada data hotel.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
