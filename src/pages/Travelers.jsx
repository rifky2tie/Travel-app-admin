import { useEffect, useState } from "react";
import axios from "axios";

export default function Travelers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: ""
  });

  // Load users from localStorage or API
  useEffect(() => {
    setLoading(true);
    const local = localStorage.getItem("travelers");
    if (local) {
      setUsers(JSON.parse(local));
      setLoading(false);
    } else {
      axios
        .get("https://dummyjson.com/users")
        .then((res) => {
          setUsers(res.data.users);
        })
        .catch((err) => {
          setError(err.message || "Gagal memuat data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("travelers", JSON.stringify(users));
    }
  }, [users]);

  // Add or Edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIdx !== null) {
      const updated = [...users];
      updated[editIdx] = { ...updated[editIdx], ...form };
      setUsers(updated);
    } else {
      setUsers([
        ...users,
        {
          id: users.length ? users[users.length - 1].id + 1 : 1,
          ...form
        }
      ]);
    }
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      username: ""
    });
    setShowForm(false);
    setEditIdx(null);
  };

  // Delete
  const handleDelete = (idx) => {
    if (window.confirm("Hapus user ini?")) {
      setUsers(users.filter((_, i) => i !== idx));
    }
  };

  // Edit
  const handleEdit = (idx) => {
    const u = users[idx];
    setForm({
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      phone: u.phone,
      username: u.username
    });
    setEditIdx(idx);
    setShowForm(true);
  };

  if (loading) return <div className="text-center">Loading data users...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daftar Users</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
          onClick={() => {
            setShowForm(true);
            setForm({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              username: ""
            });
            setEditIdx(null);
          }}
        >
          + Tambah User
        </button>
      </div>

      {showForm && (
        <form
          className="bg-white rounded-xl shadow p-6 mb-6 max-w-2xl"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Nama Depan</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Nama Belakang</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
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
              <label className="block mb-1 font-semibold">Phone</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Username</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
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

      <table className="w-full table-auto border-collapse border border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="p-3 text-left border-b">ID</th>
            <th className="p-3 text-left border-b">Name</th>
            <th className="p-3 text-left border-b">Email</th>
            <th className="p-3 text-left border-b">Phone</th>
            <th className="p-3 text-left border-b">Username</th>
            <th className="p-3 text-left border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id || idx} className="hover:bg-gray-100">
              <td className="p-3 border-b">{user.id}</td>
              <td className="p-3 border-b">{user.firstName} {user.lastName}</td>
              <td className="p-3 border-b">{user.email}</td>
              <td className="p-3 border-b">{user.phone}</td>
              <td className="p-3 border-b">{user.username}</td>
              <td className="p-3 border-b whitespace-nowrap">
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
  );
}
