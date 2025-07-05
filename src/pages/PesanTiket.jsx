import { useState, useEffect } from "react";
import { pesanTiketAPI } from "../services/pesanTiketAPI";
import AlertBox from "../components/AlertBox";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { AiFillDelete } from "react-icons/ai";

export default function PesanTiket() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState({
    nama_pemesan: "",
    email_pemesan: "",
    nama_tiket: "",
    jumlah_tiket: "",
  });
  const [tiket, setTiket] = useState([]);
  const [editId, setEditId] = useState(null);

  const loadTiket = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await pesanTiketAPI.fetchTD();
      setTiket(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Gagal memuat data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTiket();
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
        await pesanTiketAPI.updateTD(editId, dataForm);
        setSuccess("Data berhasil diperbarui!");
      } else {
        await pesanTiketAPI.createTD(dataForm);
        setSuccess("Data berhasil ditambahkan!");
      }
      setDataForm({
        nama_pemesan: "",
        email_pemesan: "",
        nama_tiket: "",
        jumlah_tiket: "",
      });
      setEditId(null);

      setTimeout(() => setSuccess(""), 3000);
      loadTiket();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tiket) => {
    setEditId(tiket.id);
    setDataForm({
      nama_pemesan: tiket.nama_pemesan,
      email_pemesan: tiket.email_pemesan,
      nama_tiket: tiket.nama_tiket,
      jumlah_tiket: tiket.jumlah_tiket,
    });
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus data ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await pesanTiketAPI.deleteTD(id);

      loadTiket();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-2 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="w-full max-w-5xl">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-2 drop-shadow">
            Pesan Tiket
          </h2>
          <p className="text-blue-500 text-lg">
            Kelola Pesan Tiket dengan mudah dan cepat
          </p>
        </div>

        <div className="bg-white/90 rounded-3xl shadow-xl overflow-hidden border border-blue-100 mb-10">
          <div className="px-8 py-5 bg-blue-50 border-b border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800">
              Daftar Pesan Tiket ({tiket.length})
            </h3>
          </div>
          {loading && <LoadingSpinner text="Memuat data..." />}
          {!loading && tiket.length === 0 && !error && (
            <EmptyState text="Belum ada tiket. Tambah tiket pertama!" />
          )}
          {!loading && tiket.length === 0 && error && (
            <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
          )}
          {!loading && tiket.length > 0 && (
            <GenericTable
              columns={[
                "#",
                "Nama Pemesan",
                "Email Pemesan",
                "Nama Tiket",
                "Jumlah Tiket",
                "Delete",
                "Ubah",
              ]}
              data={tiket}
              renderRow={(t, index) => (
                <>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {index + 1}.
                  </td>
                  <td className="px-6 py-4">{t.nama_pemesan}</td>
                  <td className="px-6 py-4">{t.email_pemesan}</td>
                  <td className="px-6 py-4">{t.nama_tiket}</td>
                  <td className="px-6 py-4">{t.jumlah_tiket}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(t.id)} disabled={loading}>
                      <AiFillDelete className="text-red-400 text-2xl hover:text-red-600 transition-colors" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(t)}
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
            {editId ? "Edit Tiket" : "Tambah Tiket Baru"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="nama_pemesan"
              value={dataForm.nama_pemesan}
              placeholder="Nama Pemesan"
              onChange={handleChange}
              required
              className="w-full p-3 bg-blue-50 rounded-xl border border-blue-200"
            />
            <input
              type="email"
              name="email_pemesan"
              value={dataForm.email_pemesan}
              placeholder="Email Pemesan"
              onChange={handleChange}
              required
              className="w-full p-3 bg-blue-50 rounded-xl border border-blue-200"
            />
            <input
              type="text"
              name="nama_tiket"
              value={dataForm.nama_tiket}
              placeholder="Nama Tiket"
              onChange={handleChange}
              required
              className="w-full p-3 bg-blue-50 rounded-xl border border-blue-200"
            />
            <input
              type="number"
              name="jumlah_tiket"
              value={dataForm.jumlah_tiket}
              placeholder="Jumlah Tiket"
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
                    setDataForm({
                      nama_pemesan: "",
                      email_pemesan: "",
                      nama_tiket: "",
                      jumlah_tiket: "",
                    });
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
