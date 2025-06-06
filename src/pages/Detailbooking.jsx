import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const statusColor = {
  Confirmed: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-600",
};

export default function Detailbooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/bookings.json")
      .then((res) => res.json())
      .then((data) => {
        if (!data[id]) {
          setError("Booking not found");
          return;
        }
        setBooking(data[id]);
      })
      .catch(() => setError("Failed to load booking data"));
  }, [id]);

  if (error) return <div className="text-red-600 p-4">{error}</div>;
  if (!booking) return <div className="p-4">Loading...</div>;

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(30,64,175,0.55),rgba(255,255,255,0.85)), url('${booking.image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-white/70 to-blue-100/90 z-0"></div>
      <div className="relative z-10 w-full max-w-2xl mx-auto rounded-3xl shadow-2xl bg-white/90 backdrop-blur-md p-10 flex flex-col items-center">
        <button
          className="absolute top-6 right-6 text-blue-500 hover:text-blue-700 font-bold text-lg"
          onClick={() => navigate("/bookings")}
        >
          &larr; Back
        </button>
        <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-white -mt-24 mb-6 bg-white">
          <img
            src={booking.image}
            alt={booking.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center w-full">
          <div className="text-3xl font-extrabold mb-2 text-blue-900 drop-shadow">{booking.title}</div>
          <div className="text-blue-600 text-lg mb-2 flex items-center justify-center">
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
            {booking.location}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4 mb-6">
            <div className="bg-blue-50 rounded-xl px-5 py-3 shadow text-left">
              <div className="text-xs text-gray-400 mb-1">Booking Code</div>
              <div className="font-bold text-blue-700">{booking.bookingCode}</div>
            </div>
            <div className="bg-blue-50 rounded-xl px-5 py-3 shadow text-left">
              <div className="text-xs text-gray-400 mb-1">Status</div>
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium inline-block ${
                  statusColor[booking.status] || "bg-gray-100 text-gray-600"
                }`}
              >
                {booking.status}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-gray-400 text-xs mb-1">Name</div>
              <div className="font-semibold text-blue-800">{booking.name}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs mb-1">Package</div>
              <div className="font-semibold">{booking.package}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs mb-1">Duration</div>
              <div>{booking.duration}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs mb-1">Date</div>
              <div>{booking.date}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs mb-1">Price</div>
              <div className="text-green-700 font-bold">{booking.price}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}