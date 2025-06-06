import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Destinasi() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/destinasi.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Gagal fetch destinasi:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Destinasi Wisata</h1>
      <div className="overflow-x-auto rounded-2xl shadow">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="py-3 px-4 text-left">Gambar</th>
              <th className="py-3 px-4 text-left">Nama</th>
              <th className="py-3 px-4 text-left">Lokasi</th>
              <th className="py-3 px-4 text-left">Deskripsi</th>
              <th className="py-3 px-4 text-left">Tag</th>
              <th className="py-3 px-4 text-left">Rating</th>
              <th className="py-3 px-4 text-left">Harga</th>
              <th className="py-3 px-4 text-left">Durasi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={item.id || idx}
                className="hover:bg-blue-50 cursor-pointer transition"
                onClick={() => navigate(`/detaildestinasi/${idx}`)}
              >
                <td className="py-2 px-4">
                  <img
                    src={item.media?.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                </td>
                <td className="py-2 px-4 font-semibold text-blue-800">
                  {item.name}
                </td>
                <td className="py-2 px-4">{item.location}</td>
                <td className="py-2 px-4 max-w-xs truncate">
                  {item.description}
                </td>
                <td className="py-2 px-4">
                  <div className="flex flex-wrap gap-1">
                    {item.features?.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-2 px-4 text-yellow-500 font-semibold">
                  {item.rating}
                </td>
                <td className="py-2 px-4 text-green-700 font-semibold">
                  {item.price || `Rp ${item.ticket_price?.toLocaleString("id-ID")}`}
                </td>
                <td className="py-2 px-4">{item.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
