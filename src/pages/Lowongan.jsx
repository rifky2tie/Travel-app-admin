import { useState, useEffect } from "react";
import { lowonganAPI } from "../services/lowonganAPI";
import AlertBox from "../components/AlertBox";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { AiFillDelete } from "react-icons/ai";

export default function Lowongan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState({
    nama: "",
    posisi: "",
    deskripsi: "",
  });
  const [lowongan, setLowongan] = useState([]);
  const [editId, setEditId] = useState(null);

  const loadLowongan = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await lowonganAPI.fetchLowongan();
      setLowongan(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Gagal memuat data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLowongan();
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
        await lowonganAPI.updateLowongan(editId, {
          nama: dataForm.nama,
          posisi: dataForm.posisi,
          deskripsi: dataForm.deskripsi,
        });
        setSuccess("Data berhasil diperbarui!");
      } else {
        await lowonganAPI.createLowongan({
          nama: dataForm.nama,
          posisi: dataForm.posisi,
          deskripsi: dataForm.deskripsi,
        });
        setSuccess("Data berhasil ditambahkan!");
      }

      setDataForm({ nama: "", posisi: "", deskripsi: "" });
      setEditId(null);

      setTimeout(() => setSuccess(""), 3000);
      loadLowongan();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (lowong) => {
    setEditId(lowong.id);
    setDataForm({
      nama: lowong.nama,
      posisi: lowong.posisi,
      deskripsi: lowong.deskripsi,
    });
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus data ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await lowonganAPI.deleteLowongan(id);

      loadLowongan();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-2">
      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-2 drop-shadow">
            Lowongan App
          </h2>
          <p className="text-blue-500 text-lg">
            Kelola Lowongan dengan mudah dan cepat
          </p>
        </div>

        <div className="bg-white/90 rounded-3xl shadow-xl overflow-hidden border border-blue-100 mb-10">
          <div className="px-8 py-5 bg-blue-50 border-b border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800">
              Daftar Lowongan ({lowongan.length})
            </h3>
          </div>
          {loading && <LoadingSpinner text="Memuat data..." />}
          {!loading && lowongan.length === 0 && !error && (
            <EmptyState text="Belum ada lowongan. Tambah lowongan pertama!" />
          )}
          {!loading && lowongan.length === 0 && error && (
            <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
          )}
          {!loading && lowongan.length > 0 && (
            <GenericTable
              columns={["#", "Nama", "Posisi", "Deskripsi", "Delete", "Ubah"]}
              data={lowongan}
              renderRow={(lowong, index) => (
                <>
                  <td className="px-6 py-4 font-medium text-gray-900">{index + 1}.</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-700">{lowong.nama}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-700">{lowong.posisi}</div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="truncate text-gray-700">{lowong.deskripsi}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(lowong.id)} disabled={loading}>
                      <AiFillDelete className="text-red-400 text-2xl hover:text-red-600 transition-colors" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(lowong)}
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
            {editId ? "Edit Lowongan" : "Tambah Lowongan Baru"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="nama"
              value={dataForm.nama}
              placeholder="Nama"
              onChange={handleChange}
              required
              className="w-full p-3 bg-blue-50 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
            />
            <input
              type="text"
              name="posisi"
              value={dataForm.posisi}
              placeholder="Posisi"
              onChange={handleChange}
              required
              className="w-full p-3 bg-blue-50 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
            />
            <textarea
              name="deskripsi"
              value={dataForm.deskripsi}
              placeholder="Deskripsi"
              onChange={handleChange}
              disabled={loading}
              required
              rows="3"
              className="w-full p-3 bg-blue-50 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 resize-none"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow"
                disabled={loading}
              >
                {loading ? "Mohon Tunggu..." : editId ? "Simpan Perubahan" : "Tambah Data"}
              </button>
              {editId && (
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-blue-700 font-semibold rounded-xl transition-all duration-200"
                  onClick={() => {
                    setEditId(null);
                    setDataForm({ nama: "", posisi: "", deskripsi: "" });
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
