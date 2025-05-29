import { BsFillPeopleFill } from "react-icons/bs";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import {
  MdDashboard,
  MdOutlineCalendarToday,
  MdPeopleAlt,
  MdOutlineMessage,
  MdOutlineThumbUp,
  MdErrorOutline,
} from "react-icons/md";
import { FaImages, FaMapMarkerAlt, FaServicestack } from "react-icons/fa"; // Tambahkan import untuk ikon FaMapMarkerAlt
import { Link, NavLink } from "react-router-dom";

export default function Listmenu() {
  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md ${
      isActive
        ? "bg-blue-100 text-blue-600 font-medium"
        : "hover:text-blue-600 hover:bg-blue-100 text-gray-500"
    }`;

  return (
    <ul className="space-y-2 text-gray-500 text-sm">
      <li>
        <NavLink to="/" className={menuClass}>
          <MdDashboard />
          <span>Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/Destinasi" className={menuClass}>
          <FaMapMarkerAlt />
          <span>Daftar Destinasi</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/Testi" className={menuClass}>
          <MdOutlineThumbUp />
          <span>Feedback</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/service" className={menuClass}>
          <FaServicestack />
          <span>Service</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/Travelers" className={menuClass}>
          <MdPeopleAlt />
          <span>Travelers</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/guides" className={menuClass}>
          <MdOutlineCalendarToday />
          <span>Guides</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/bookings" className={menuClass}>
          <MdOutlineCalendarToday />
          <span>Bookings</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/gallery" className={menuClass}>
          <FaImages />
          <span>Gallery</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/messages" className={menuClass}>
          <div className="flex items-center gap-3">
            <MdOutlineMessage />
            <span>Messages</span>
          </div>
          <span className="text-white text-xs bg-blue-500 rounded-full px-2">
            7
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/error400" className={menuClass}>
          <MdErrorOutline />
          <span>Error 400</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/error401" className={menuClass}>
          <MdErrorOutline />
          <span>Error 401</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/error403" className={menuClass}>
          <MdErrorOutline />
          <span>Error 403</span>
        </NavLink>
      </li>
      
    </ul>
  );
}
