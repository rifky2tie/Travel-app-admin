import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/gallery.json")
      .then((res) => res.json())
      .then((data) => setGallery(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow overflow-hidden flex flex-col cursor-pointer hover:bg-blue-50 transition"
            onClick={() => navigate(`/detailgallery/${idx}`)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <div className="font-semibold text-base mb-1">{item.title}</div>
              <div className="text-gray-500 text-sm flex items-center mb-1">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" />
                  <path d="M15 11a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {item.location}
              </div>
              <div className="text-gray-400 text-xs mt-auto">...</div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination & Footer */}
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Showing</span>
          <select className="border rounded px-2 py-1">
            <option>12</option>
          </select>
          <span>out of 2,560</span>
        </div>
        <div className="flex items-center space-x-1">
          <button className="px-3 py-1 rounded bg-gray-100 text-gray-600">&lt; Previous</button>
          <button className="px-3 py-1 rounded bg-blue-500 text-white">1</button>
          <button className="px-3 py-1 rounded bg-gray-100 text-gray-600">2</button>
          <button className="px-3 py-1 rounded bg-gray-100 text-gray-600">3</button>
          <span className="px-2">...</span>
          <button className="px-3 py-1 rounded bg-gray-100 text-gray-600">16</button>
          <button className="px-3 py-1 rounded bg-gray-100 text-gray-600">Next &gt;</button>
        </div>
        
      </div>
      
    </div>
  );
}