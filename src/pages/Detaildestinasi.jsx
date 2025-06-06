import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Detaildestinasi() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destinasi, setDestinasi] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/destinasi.json")
      .then((res) => res.json())
      .then((data) => {
        if (!data[id]) {
          setError("Destinasi not found");
          return;
        }
        setDestinasi(data[id]);
      })
      .catch(() => setError("Failed to load destinasi data"));
  }, [id]);

  if (error) return <div className="text-red-600 p-4">{error}</div>;
  if (!destinasi) return <div className="p-4">Loading...</div>;

  // Gunakan media.image_url jika ada, fallback ke destinasi.image jika tidak
  const imageUrl = destinasi.media?.image_url || destinasi.image;
  const tags = destinasi.features?.tags || [];
  const facilities = destinasi.features?.facilities || [];
  const kategori = destinasi.extra_info?.id_kategori;
  const recommended = destinasi.extra_info?.recommended_visit;
  const price = destinasi.price || `Rp ${destinasi.ticket_price?.toLocaleString("id-ID")}`;

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(30,64,175,0.55),rgba(255,255,255,0.85)), url('${imageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-white/70 to-blue-100/90 z-0"></div>
      <div
        className="relative z-10 w-full max-w-3xl mx-auto rounded-3xl shadow-2xl bg-white/90 backdrop-blur-md p-10 flex flex-col items-center"
        style={{ marginTop: "80px" }} // Tambahkan margin top agar tidak menabrak header
      >
        <div className="w-40 h-40 rounded-3xl overflow-hidden shadow-lg border-4 border-white -mt-28 mb-6 bg-white">
          <img
            src={imageUrl}
            alt={destinasi.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center w-full">
          <div className="text-4xl font-extrabold mb-2 text-blue-900 drop-shadow">{destinasi.name}</div>
          <div className="text-blue-600 text-lg mb-4 flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" />
              <path d="M15 11a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {destinasi.location}
          </div>
          <div className="bg-blue-50/80 rounded-xl p-6 text-gray-700 text-lg shadow-inner mb-6">
            {destinasi.description}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {tags.map((tag, i) => (
              <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold shadow">{tag}</span>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/80 rounded-xl p-4 shadow flex flex-col items-center">
              <span className="text-gray-500 text-sm">Rating</span>
              <span className="text-yellow-500 font-bold text-2xl flex items-center">
                <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
                {destinasi.rating}
              </span>
            </div>
            <div className="bg-white/80 rounded-xl p-4 shadow flex flex-col items-center">
              <span className="text-gray-500 text-sm">Harga</span>
              <span className="text-green-700 font-bold text-xl">{price}</span>
            </div>
            <div className="bg-white/80 rounded-xl p-4 shadow flex flex-col items-center">
              <span className="text-gray-500 text-sm">Durasi</span>
              <span className="text-blue-900 font-bold text-lg">{destinasi.duration}</span>
            </div>
            <div className="bg-white/80 rounded-xl p-4 shadow flex flex-col items-center">
              <span className="text-gray-500 text-sm">Kategori</span>
              <span className="text-blue-700 font-bold text-lg">{kategori}</span>
            </div>
          </div>
          <div className="mb-6">
            <div className="font-semibold text-blue-900 mb-1">Fasilitas:</div>
            <ul className="flex flex-wrap gap-2 justify-center">
              {facilities.map((f, i) => (
                <li key={i} className="bg-blue-200/70 text-blue-900 px-3 py-1 rounded-lg text-xs shadow">{f}</li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <div className="font-semibold text-blue-900 mb-1">Rekomendasi Waktu Kunjungan:</div>
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl inline-block shadow">{recommended}</div>
          </div>
        </div>
        <button
          className="w-full mt-2 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition text-lg shadow-lg"
          onClick={() => navigate("/destinasi")}
        >
          Back to Destinasi
        </button>
      </div>
    </div>
  );
}