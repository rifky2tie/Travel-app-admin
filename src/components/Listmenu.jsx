
import { BsFillInfoCircleFill } from "react-icons/bs"; 
import { AiFillQuestionCircle } from "react-icons/ai"; 
import { FcAbout } from "react-icons/fc"; 
import { MdTour } from "react-icons/md"; 
import { useState } from "react";
import { GiTicket } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { CgWorkAlt } from "react-icons/cg";
import {
  MdDashboard,
  MdOutlineCalendarToday,
  MdPeopleAlt,
  MdOutlineMessage,
  MdOutlineThumbUp,

} from "react-icons/md";
import { FaImages, FaMapMarkerAlt, FaServicestack } from "react-icons/fa"; // Tambahkan import untuk ikon FaMapMarkerAlt
import { Link, NavLink } from "react-router-dom";
import { IoPeopleCircleSharp } from "react-icons/io5";

export default function Listmenu() {
  const [openDropdown, setOpenDropdown] = useState(false);

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 py-2 rounded-md transition-all mx-6
    ${isActive
      ? "bg-blue-400 text-white font-medium px-4"
      : "hover:text-white hover:bg-blue-400 text-gray-500 px-4"
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
          <MdTour />
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
        <NavLink to="/faq" className={menuClass}>
          <AiFillQuestionCircle />
          <span>FAQ</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/Lowongan" className={menuClass}>
          <CgWorkAlt />
          <span>Lowongan kerja</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/Tim" className={menuClass}>
          <IoIosPeople />
          <span>Daftar Tim</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/users" className={menuClass}>
          <IoPeopleCircleSharp />
          <span>Daftar Pengguna</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/artikel" className={menuClass}>
          <BsFillInfoCircleFill />
          <span>Artikel</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/Us" className={menuClass}>
          <FcAbout/>
          <span>About Us</span>
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
      <li className="relative">
        <button
          type="button"
          onClick={() => setOpenDropdown((v) => !v)}
          className="flex items-center gap-3 px-4 py-2 rounded-md hover:text-blue-600 hover:bg-blue-100 text-gray-500 cursor-pointer w-full"
        >
          <GiTicket />
          <span>Tiket</span>
          <svg
            className="ml-auto w-3 h-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {openDropdown && (
          <ul
            className="absolute left-full top-0 mt-0 ml-2 bg-white border border-gray-100 rounded-md shadow-lg w-48 py-2 z-10"
            onMouseLeave={() => setOpenDropdown(false)}
          >
            <li>
              <NavLink
                to="/PesanTiket"
                className={menuClass}
                onClick={() => setOpenDropdown(false)}
              >
               
                <span>Pesan Tiket</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/TiketDestinasi"
                className={menuClass}
                onClick={() => setOpenDropdown(false)}
              >
                
                <span>Tiket Destinasi</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hotel"
                className={menuClass}
                onClick={() => setOpenDropdown(false)}
              >
                <span>Tiket Penginapan</span>
              </NavLink>
            </li>
          </ul>
        )}
      </li>

      {/* <li>
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
      </li> */}
    </ul>
  );
}
