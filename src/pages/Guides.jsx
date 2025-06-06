import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Guides() {
  const [guides, setGuides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/guides.json")
      .then((res) => res.json())
      .then((data) => setGuides(data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Guides</h1>
      <div className="space-y-4">
        {guides.map((guide, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/Detailguides/${idx}`)}
            className="flex items-center p-5 rounded-xl shadow-sm bg-white relative cursor-pointer hover:bg-blue-50 transition"
          >
            <img
              src={guide.foto}
              alt={guide.nama}
              className="w-16 h-16 rounded-full object-cover mr-5 border"
            />
            <div className="flex-1">
              <div className="font-bold text-lg">{guide.nama}</div>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <span className="mr-3 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M16 12a4 4 0 01-8 0V8a4 4 0 018 0v4z" />
                    <path d="M12 16v2m0 0a4 4 0 01-4-4h8a4 4 0 01-4 4z" />
                  </svg>
                  {guide.email}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  {guide.noHP}
                </span>
              </div>
            </div>
            <span className="absolute right-6 top-6 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
              {guide.lokasi}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}