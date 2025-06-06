import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Detailgallery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/gallery.json")
      .then((res) => res.json())
      .then((data) => {
        if (!data[id]) {
          setError("Gallery item not found");
          return;
        }
        setItem(data[id]);
      })
      .catch(() => setError("Failed to load gallery data"));
  }, [id]);

  if (error) return <div className="text-red-600 p-4">{error}</div>;
  if (!item) return <div className="p-4">Loading...</div>;

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(30,64,175,0.45),rgba(255,255,255,0.85)), url('${item.image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-white/70 to-blue-100/90 z-0"></div>
      <div className="relative z-10 w-full max-w-2xl mx-auto rounded-3xl shadow-2xl bg-white/90 backdrop-blur-md p-10 flex flex-col items-center">
        <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-white -mt-24 mb-6 bg-white">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <div className="text-4xl font-extrabold mb-2 text-blue-900 drop-shadow">
            {item.title}
          </div>
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
            {item.location}
          </div>
          <div className="bg-blue-50 rounded-xl p-5 text-gray-700 text-base shadow-inner">
            {item.description}
          </div>
        </div>
        <button
          className="w-full mt-8 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition text-lg shadow"
          onClick={() => navigate("/gallery")}
        >
          Back to Gallery
        </button>
      </div>
    </div>
  );
}