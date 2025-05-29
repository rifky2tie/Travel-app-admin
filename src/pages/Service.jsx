import React, { useEffect, useState } from "react";
import Table from "./Table";
import { Pencil, Trash2 } from "lucide-react";

export default function Service() {
  const [data, setData] = useState([]);

  const columns = ["ID", "Title", "Description", "Image", "Action"];

  useEffect(() => {
    fetch("/data/service.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const formattedData = data.map((item) => ({
    "ID": `#00${item.id}`,
    Title: item.title,
    Description: item.keterangan,
    Image: (
      <img
        src={item.gambar}
        alt={item.title}
        className="w-12 h-12 rounded object-cover"
      />
    ),
    Action: (
      <div className="flex space-x-2">
        <button className="text-purple-600 hover:scale-110 transition">
          <Pencil size={16} />
        </button>
        <button className="text-red-600 hover:scale-110 transition">
          <Trash2 size={16} />
        </button>
      </div>
    ),
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Service Table</h1>
      <Table columns={columns} data={formattedData} />
    </div>
  );
}
