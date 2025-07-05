import { useState, useEffect } from "react";
import { feedbackAPI } from "../services/feedbackAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { AiFillDelete } from "react-icons/ai";

export default function Testi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState([]);

  const loadFeedback = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await feedbackAPI.fetchFeedback();
      setFeedback(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Gagal memuat catatan");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus feedback ini?");
    if (!konfirmasi) return;
    try {
      setLoading(true);
      setError("");
      await feedbackAPI.deleteFeedback(id);
      loadFeedback();
    } catch (err) {
      setError("Gagal menghapus feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-2 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="w-full max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-2 drop-shadow">
            Traveler Feedback
          </h2>
          <p className="text-blue-500 text-lg">
            Lihat pengalaman dan testimoni traveler lainnya
          </p>
        </div>

        {loading && <LoadingSpinner text="Memuat feedback..." />}
        {!loading && feedback.length === 0 && !error && (
          <EmptyState text="Belum ada feedback." />
        )}
        {!loading && feedback.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedback.map((testi, idx) => (
              <div
                key={testi.id || idx}
                className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2 relative"
              >
                <button
                  className="absolute top-3 right-3 text-red-400 hover:text-red-600"
                  onClick={() => handleDelete(testi.id)}
                  title="Hapus"
                  disabled={loading}
                >
                  <AiFillDelete size={22} />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-lg uppercase">
                    {testi.nama?.slice(0, 2) || "??"}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{testi.nama}</div>
                  </div>
                </div>
                <div className="text-gray-600">{testi.testimoni}</div>
              </div>
            ))}
          </div>
        )}
        {error && (
          <div className="mt-6 text-center text-red-500 font-semibold">{error}</div>
        )}
      </div>
    </div>
  );
}
