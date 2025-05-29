import React, { useEffect, useState } from "react";

const statusColor = {
  Confirmed: "bg-blue-100 text-blue-700",
  Pending: "bg-blue-50 text-blue-500",
  Cancelled: "bg-red-100 text-red-500",
};

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("/data/bookings.json")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div className="w-full min-h-screen py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Bookings</h1>
      <div className="bg-white rounded-2xl shadow p-4 w-full overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-blue-50">
              <th className="py-3 px-4 rounded-tl-2xl">Name</th>
              <th className="py-3 px-4">Booking Code</th>
              <th className="py-3 px-4">Package</th>
              <th className="py-3 px-4">Duration</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4 rounded-tr-2xl">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="py-3 px-4">{b.name}</td>
                <td className="py-3 px-4">{b.bookingCode}</td>
                <td className="py-3 px-4">{b.package}</td>
                <td className="py-3 px-4">{b.duration}</td>
                <td className="py-3 px-4">{b.date}</td>
                <td className="py-3 px-4">{b.price}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium inline-block ${
                      statusColor[b.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}