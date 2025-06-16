import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div id="header-container" className="flex justify-between items-center p-4 bg-white shadow-sm">
      
      {/* Left: Dashboard Text */}

      {/* Middle: Search Bar */}
      <div id="search-bar" className="relative w-full max-w-md mx-4">
        <input
          id="search-input"
          className="border border-gray-200 p-2 pr-10 bg-white w-full rounded-md outline-none"
          type="text"
          placeholder="Search anything"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Right: Icons & Profile */}
      <div id="icons-container" className="flex items-center space-x-2">
        {/* Login Button */}
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Guest
        </Link>

        <Link
          to="/loginn"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Login
        </Link>

        {/* Notification */}
        <div className="relative p-2 bg-blue-100 rounded-full text-blue-500 cursor-pointer">
          <FaBell />
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full text-xs px-1">3</span>
        </div>

        {/* Chart Icon */}
        <div className="p-2 bg-blue-100 rounded-full cursor-pointer">
          <FcAreaChart />
        </div>

        {/* Settings */}
        <div className="p-2 bg-red-100 rounded-full text-red-500 cursor-pointer">
          <SlSettings />
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-2 border-l pl-4 border-gray-300">
          <span>
            Hello, <b>Rifky</b>
          </span>
          <img
            src="https://avatar.iran.liara.run/public/28"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}