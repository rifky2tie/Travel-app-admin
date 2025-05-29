import { MdLocationOn } from "react-icons/md";
import Listmenu from "./Listmenu";

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
      <Listmenu />
    </div>
  );
}
