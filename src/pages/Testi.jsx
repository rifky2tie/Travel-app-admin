import React, { useEffect, useState } from "react";
import Table from "./Table";

export default function Testi() {
  const [data, setData] = useState([]);

  const columns = ["Avatar", "Name", "Testimonial"];

  useEffect(() => {
    fetch("/data/testi.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to fetch testimonial:", err));
  }, []);

  const formattedData = data.map((item) => ({
    Avatar: (
      <img
        src={item.image}
        alt={item.name}
        className="w-12 h-12 rounded-full object-cover"
      />
    ),
    Name: item.name,
    Testimonial: item.testimonial,
  }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Testimonial Table</h2>
      <Table columns={columns} data={formattedData} />
    </div>
  );
}
