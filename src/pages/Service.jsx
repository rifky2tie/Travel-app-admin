import { useState, useEffect } from "react";
import { layananAPI } from "../services/layananAPI";
import AlertBox from "../components/AlertBox";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { AiFillDelete } from "react-icons/ai";

export default function Service() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState({
    title: "",
    description: "",
  });
  const [layanan, setLayanan] = useState([]);
  const [editId, setEditId] = useState(null);

  // Memanggil fetchLayanan beserta error/loading handling
  const loadLayanan = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await layananAPI.fetchLayanan();
      setLayanan(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Gagal memuat catatan");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLayanan();
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
        await layananAPI.updateLayanan(editId, {
          title: dataForm.title,
          description: dataForm.description,
        });
        setSuccess("Catatan berhasil diperbarui!");
      } else {
        await layananAPI.createLayanan({
          title: dataForm.title,
          description: dataForm.description,
        });
        setSuccess("Catatan berhasil ditambahkan!");
      }

      setDataForm({ title: "", description: "" });
      setEditId(null);

      setTimeout(() => setSuccess(""), 3000);
      loadLayanan();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (layan) => {
    setEditId(layan.id);
    setDataForm({
      title: layan.title,
      description: layan.description,
    });
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus catatan ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await layananAPI.deleteLayanan(id);

      loadLayanan();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-2 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200"

    >
      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-2 drop-shadow">
            Layanan App
          </h2>
          <p className="text-blue-500 text-lg">
            Kelola layanan dan catatan dengan mudah dan cepat
          </p>
        </div>

        {/* TABLE DITARUH DI ATAS */}
        <div className="bg-white/90 rounded-3xl shadow-xl overflow-hidden border border-blue-100 mb-10">
          <div className="px-8 py-5 bg-blue-50 border-b border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800">
              Daftar Layanan ({layanan.length})
            </h3>
          </div>
          {loading && <LoadingSpinner text="Memuat catatan..." />}
          {!loading && layanan.length === 0 && !error && (
            <EmptyState text="Belum ada layanan. Tambah layanan pertama!" />
          )}
          {!loading && layanan.length === 0 && error && (
            <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
          )}
          {!loading && layanan.length > 0 && (
            <GenericTable
              columns={["#", "Judul", "Deskripsi", "Delete", "Ubah"]}
              data={layanan}
              renderRow={(layan, index) => (
                <>
                  <td className="px-6 py-4 font-medium text-gray-900">{index + 1}.</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-700">{layan.title}</div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="truncate text-gray-700">{layan.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(layan.id)} disabled={loading}>
                      <AiFillDelete className="text-red-400 text-2xl hover:text-red-600 transition-colors" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(layan)}
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
            {editId ? "Edit layanan" : "Tambah layanan Baru"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="title"
              value={dataForm.title}
              placeholder="Judul layanan"
              onChange={handleChange}
              required
              className="w-full p-3 bg-blue-50 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
            />
            <textarea
              name="description"
              value={dataForm.description}
              placeholder="Deskripsi layanan"
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
                    setDataForm({ title: "", description: "" });
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
