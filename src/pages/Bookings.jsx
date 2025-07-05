import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const statusColor = {
  Confirmed: "bg-blue-100 text-blue-700",
  Pending: "bg-blue-50 text-blue-500",
  Cancelled: "bg-red-100 text-red-500",
};

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    name: "",
    bookingCode: "",
    package: "",
    duration: "",
    date: "",
    price: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const navigate = useNavigate();

  // Load from localStorage or fetch from JSON
  useEffect(() => {
    const local = localStorage.getItem("bookings");
    if (local) {
      setBookings(JSON.parse(local));
    } else {
      fetch("/data/bookings.json")
        .then((res) => res.json())
        .then((data) => setBookings(data));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem("bookings", JSON.stringify(bookings));
    }
  }, [bookings]);

  // Add or Edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIdx !== null) {
      const updated = [...bookings];
      updated[editIdx] = form;
      setBookings(updated);
    } else {
      setBookings([...bookings, form]);
    }
    setForm({
      name: "",
      bookingCode: "",
      package: "",
      duration: "",
      date: "",
      price: ""
    });
    setShowForm(false);
    setEditIdx(null);
  };

  // Delete
  const handleDelete = (idx) => {
    if (window.confirm("Hapus booking ini?")) {
      setBookings(bookings.filter((_, i) => i !== idx));
    }
  };

  // Edit
  const handleEdit = (idx) => {
    setForm(bookings[idx]);
    setEditIdx(idx);
    setShowForm(true);
  };

  return (
    <div className="w-full min-h-screen py-8 bg-gray-50 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <h1 className="text-3xl font-bold mb-8 text-center">Bookings</h1>
      <div className="flex justify-end mb-4 px-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
          onClick={() => {
            setShowForm(true);
            setForm({
              name: "",
              bookingCode: "",
              package: "",
              duration: "",
              date: "",
              price: ""
            });
            setEditIdx(null);
          }}
        >
          + Tambah Booking
        </button>
      </div>
      {showForm && (
        <form
          className="bg-white rounded-xl shadow p-6 mb-6 max-w-2xl mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Name</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Booking Code</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.bookingCode}
                onChange={(e) => setForm({ ...form, bookingCode: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Package</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.package}
                onChange={(e) => setForm({ ...form, package: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Duration</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Date</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Price</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
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
      <div className="bg-white rounded-2xl shadow p-4 w-full overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-3 px-4 rounded-tl-2xl">Name</th>
              <th className="py-3 px-4">Booking Code</th>
              <th className="py-3 px-4">Package</th>
              <th className="py-3 px-4">Duration</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4 rounded-tr-2xl">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, idx) => (
              <tr
                key={idx}
                className="border-b last:border-b-0 cursor-pointer hover:bg-blue-50 transition"
                onClick={() => navigate(`/detailbooking/${idx}`)}
              >
                <td className="py-3 px-4">{b.name}</td>
                <td className="py-3 px-4">{b.bookingCode}</td>
                <td className="py-3 px-4">{b.package}</td>
                <td className="py-3 px-4">{b.duration}</td>
                <td className="py-3 px-4">{b.date}</td>
                <td className="py-3 px-4">{b.price}</td>
                <td className="py-3 px-4 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                  <button
                    className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs font-semibold mr-2"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}