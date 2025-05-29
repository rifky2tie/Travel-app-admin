import React, { useEffect, useState } from "react";
import Table from "./Table";

export default function Destinasi() {
  const [data, setData] = useState([]);
  const columns = [
    "Gambar",
    "Nama",
    "Lokasi",
    "Rating",
    "Harga Tiket",
    "Durasi",
    "Kategori",
    "Kunjungan Rekomendasi"
  ];

  useEffect(() => {
    fetch("/data/destinasi.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Gagal fetch destinasi:", err));
  }, []);

  const formattedData = data.map((item) => ({
    Gambar: (
      <img
        src={item.media.image_url}
        alt={item.name}
        className="w-16 h-16 object-cover rounded"
      />
    ),
    Nama: item.name,
    Lokasi: item.location,
    Rating: item.rating,
    "Harga Tiket": `Rp ${item.ticket_price.toLocaleString("id-ID")}`,
    Durasi: item.duration,
    Kategori: item.extra_info.id_kategori,
    "Kunjungan Rekomendasi": item.extra_info.recommended_visit
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tabel Destinasi Wisata</h1>
      <Table columns={columns} data={formattedData} />
    </div>
  );
}
