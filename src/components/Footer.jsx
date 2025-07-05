import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-white border-t border-gray-100 text-gray-400 text-sm gap-2">
      <div className="flex items-center gap-2">
        <span>
          <span className="font-semibold text-gray-500">Copyright © 2024 </span>
        </span>
        <span className="hidden md:inline mx-2">|</span>
        <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
        <span className="mx-1">·</span>
        <a href="#" className="hover:text-blue-500 transition-colors">Term and conditions</a>
        <span className="mx-1">·</span>
        <a href="#" className="hover:text-blue-500 transition-colors">Contact</a>
      </div>
      <div className="flex items-center gap-4 mt-2 md:mt-0">
        <a href="#" className="hover:text-blue-500 transition-colors"><FaFacebookF /></a>
        <a href="#" className="hover:text-blue-500 transition-colors"><FaXTwitter /></a>
        <a href="#" className="hover:text-blue-500 transition-colors"><FaInstagram /></a>
        <a href="#" className="hover:text-blue-500 transition-colors"><FaYoutube /></a>
        <a href="#" className="hover:text-blue-500 transition-colors"><FaLinkedinIn /></a>
      </div>
    </footer>
  );
}