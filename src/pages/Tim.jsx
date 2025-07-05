import { useState, useEffect } from "react";
import { timAPI } from "../services/timAPI";
import AlertBox from "../components/AlertBox";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { AiFillDelete } from "react-icons/ai";

export default function Tim() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState({
    nama: "",
    posisi: "",
    email: "",
    no_hp: "",
    usia: "",
  });
  const [tim, setTim] = useState([]);
  const [editId, setEditId] = useState(null);

  const loadTim = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await timAPI.fetchTim();
      setTim(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Gagal memuat data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTim();
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editId) {
        await timAPI.updateTim(editId, {
          nama: dataForm.nama,
          posisi: dataForm.posisi,
          email: dataForm.email,
          no_hp: dataForm.no_hp,
          usia: dataForm.usia,
        });
        setSuccess("Data berhasil diperbarui!");
      } else {
        await timAPI.createTim({
          nama: dataForm.nama,
          posisi: dataForm.posisi,
          email: dataForm.email,
          no_hp: dataForm.no_hp,
          usia: dataForm.usia,
        });
        setSuccess("Data berhasil ditambahkan!");
      }
      setDataForm({ nama: "", posisi: "", email: "", no_hp: "", usia: "" });
      setEditId(null);

      setTimeout(() => setSuccess(""), 3000);
      loadTim();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tim) => {
    setEditId(tim.id);
    setDataForm({
      nama: tim.nama,
      posisi: tim.posisi,
      email: tim.email,
      no_hp: tim.no_hp,
      usia: tim.usia,
    });
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus data ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await timAPI.deleteTim(id);

      loadTim();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-10 px-2">
      <div className="w-full max-w-5xl">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-2 drop-shadow">
            Tim App
          </h2>
          <p className="text-blue-500 text-lg">
            Kelola Tim dengan mudah dan cepat
          </p>
        </div>

        <div className="bg-white/90 rounded-3xl shadow-xl overflow-hidden border border-blue-100 mb-10">
          <div className="px-8 py-5 bg-blue-50 border-b border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800">
              Daftar Tim ({tim.length})
            </h3>
          </div>
          {loading && <LoadingSpinner text="Memuat data..." />}
          {!loading && tim.length === 0 && !error && (
            <EmptyState text="Belum ada tim. Tambah tim pertama!" />
          )}
          {!loading && tim.length === 0 && error && (
            <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
          )}
          {!loading && tim.length > 0 && (
            <GenericTable
              columns={["#", "Nama", "Posisi", "Email", "No HP", "Usia", "Delete", "Ubah"]}
              data={tim}
              renderRow={(tim, index) => (
                <>
                  <td className="px-6 py-4 font-medium text-gray-900">{index + 1}.</td>
                  <td className="px-6 py-4">{tim.nama}</td>
                  <td className="px-6 py-4">{tim.posisi}</td>
                  <td className="px-6 py-4">{tim.email}</td>
                  <td className="px-6 py-4">{tim.no_hp}</td>
                  <td className="px-6 py-4">{tim.usia}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(tim.id)} disabled={loading}>
                      <AiFillDelete className="text-red-400 text-2xl hover:text-red-600 transition-colors" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(tim)}
                      disabled={loading}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Edit
                    </button>
                  </td>
                </>
              )}
            />
          )}
        </div>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <div className="bg-white/90 rounded-3xl shadow-xl p-8 border border-blue-100">
          <h3 className="text-xl font-bold text-blue-700 mb-4">
            {editId ? "Edit Tim" : "Tambah Tim Baru"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="nama"
              value={dataForm.nama}
              placeholder="Nama"
              onChange={handleChange}
              required
              className="w-full p-3 bg-blue-50 rounded-xl border border-blue-200"
            />
            <input
              type="text"
              name="posisi"
              value={dataForm.posisi}
              placeholder="Posisi"
              onChange={handleChange}
              required
              className="w-full p-3 bg-blue-50 rounded-xl border border-blue-200"
            />
            <input
              type="email"
              name="email"
              value={dataForm.email}
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full p-3 bg-blue-50 rounded-xl border border-blue-200"
            />
            <input
              type="text"
              name="no_hp"
              value={dataForm.no_hp}
              placeholder="No HP"
              onChange={handleChange}
              required
              className="w-full p-3 bg-blue-50 rounded-xl border border-blue-200"
            />
            <input
              type="text"
              name="usia"
              value={dataForm.usia}
              placeholder="Usia"
              onChange={handleChange}
              required
              className="w-full p-3 bg-blue-50 rounded-xl border border-blue-200"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow"
                disabled={loading}
              >
                {loading
                  ? "Mohon Tunggu..."
                  : editId
                  ? "Simpan Perubahan"
                  : "Tambah Data"}
              </button>
              {editId && (
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-blue-700 font-semibold rounded-xl transition-all duration-200"
                  onClick={() => {
                    setEditId(null);
                    setDataForm({ nama: "", posisi: "", email: "", no_hp: "", usia: "" });
                  }}
                  disabled={loading}
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
