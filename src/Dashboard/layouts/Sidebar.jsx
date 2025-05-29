import { MdLocationOn } from "react-icons/md";
import {
  MdDashboard,
  MdOutlineCalendarToday,
  MdPeopleAlt,
  MdOutlineMessage,
  MdOutlineThumbUp,
} from "react-icons/md";
import { FaSuitcase, FaImages } from "react-icons/fa";
// import { FaMapMarkerAlt } from "react-icons/fa"; // Import ikon untuk Daftar Tujuan

export default function Sidebar() {
  return (
    <div className="min-h-screen w-64 bg-white shadow-md p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-2">
        <span className="text-blue-500 text-xl">
          <MdLocationOn />
        </span>
        <span className="font-Poppins-Extrabold text-lg text-gray-800">
          Travelie
        </span>
      </div>

      {/* Menu List */}
      <ul className="space-y-2 text-gray-500 text-sm">
        <li className="flex items-center gap-3 bg-blue-100 text-blue-600 rounded-md px-4 py-2 font-medium cursor-pointer">
          <MdDashboard />
          <span>Dashboard</span>
        </li>
        <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer px-4 py-2">
          <MdOutlineCalendarToday />
          <span>Bookings</span>
        </li>
        <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer px-4 py-2">
          <MdPeopleAlt />
          <span>Travelers</span>
        </li>
        <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer px-4 py-2">
          <FaImages />
          <span>Gallery</span>
        </li>
        <li className="flex items-center justify-between px-4 py-2 hover:text-blue-600 cursor-pointer">
          <div className="flex items-center gap-3">
            <MdOutlineMessage />
            <span>Messages</span>
          </div>
          <span className="text-white text-xs bg-blue-500 rounded-full px-2">
            7
          </span>
        </li>
        <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer px-4 py-2">
          <MdOutlineThumbUp />
          <span>Feedback</span>
        </li>
       
      </ul>
    </div>
  );
}
