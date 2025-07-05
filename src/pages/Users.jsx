import React, { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Load from localStorage or fetch from JSON
  useEffect(() => {
    const local = localStorage.getItem("users");
    if (local) {
      setUsers(JSON.parse(local));
      setLoading(false);
    } else {
      fetch("/data/users.json")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  // Add or Edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIdx !== null) {
      const updated = [...users];
      updated[editIdx] = form;
      setUsers(updated);
    } else {
      setUsers([...users, form]);
    }
    setForm({ name: "", email: "", password: "" });
    setShowForm(false);
    setEditIdx(null);
  };

  // Delete
  const handleDelete = (idx) => {
    if (window.confirm("Hapus pengguna ini?")) {
      setUsers(users.filter((_, i) => i !== idx));
    }
  };

  // Edit
  const handleEdit = (idx) => {
    setForm(users[idx]);
    setEditIdx(idx);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
        <span className="text-blue-400 text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex flex-col items-center py-10">
      <div className="w-full max-w-3xl">
        <div className="flex justify-end mb-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
            onClick={() => {
              setShowForm(true);
              setForm({ name: "", email: "", password: "" });
              setEditIdx(null);
            }}
          >
            + Tambah Pengguna
          </button>
        </div>
        {showForm && (
          <form
            className="bg-white rounded-2xl shadow p-6 mb-8"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Nama</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Email</label>
              <input
                className="border rounded px-3 py-2 w-full"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Password</label>
              <input
                className="border rounded px-3 py-2 w-full"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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
        <div className="bg-white rounded-2xl shadow p-4 w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-3 px-4">Nama</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Password</th>
                <th className="py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.password}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
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
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-blue-400">
                    Tidak ada data pengguna.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}