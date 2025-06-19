import { FaBell } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white">
      {/* Left: Title */}
      <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>

      {/* Right: Search, Notification, Profile */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search anything"
            className="pl-10 pr-4 py-2 rounded-xl bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            style={{ width: 200 }}
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Notification */}
        <div className="relative">
          <FaBell className="text-xl text-gray-400" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-1">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-gray-900">Ruben Herwitz</span>
            <span className="text-xs text-gray-400">Admin</span>
          </div>
          <svg
            className="ml-1 text-gray-400"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </header>
  );
}