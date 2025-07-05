import { Outlet } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function AuthLayout() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/pexels-pixabay-62623.jpg')",
      }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <span className="text-blue-500 text-3xl mr-2">
            <MdLocationOn />
          </span>
          <h1 className="text-4xl font-Poppins-Extrabold text-gray-800">
            GoTravel
          </h1>
        </div>

        <Outlet />

        <p className="text-center text-sm text-gray-500 mt-6">
          © 2025 GoTravel Admin Dashboard. All rights reserved.
        </p>
      </div>
    </div>
  );
}
