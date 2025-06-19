import { MdLocationOn } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import Listmenu from "./Listmenu";

export default function Sidebar() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="mb-10 flex items-center gap-2 p-6">
          <span className="text-blue-500 text-xl">
            <MdLocationOn />
          </span>
          <span className="font-Poppins-Medium text-lg text-gray-800">
            GoTravel
          </span>
        </div>

        {/* Menu List */}
        <Listmenu />

        {/* Logout Button */}
        <a
          href="#"
          className="flex items-center gap-2 text-gray-500 hover:text-red-500 font-medium px-6 py-3 mt-auto mb-6"
        >
          <FiLogOut className="text-xl" />
          <span>Logout</span>
        </a>
      </aside>
      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        {/* ...main content... */}
      </main>
    </div>
  );
}
