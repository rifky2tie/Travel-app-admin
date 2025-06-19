import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar kiri dengan border kanan */}
      <Sidebar />

      {/* Area tengah */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          {/* Konten utama + Footer */}
          <div className="flex-1 flex flex-col">
            <main className="flex-1 overflow-y-auto">
              <Outlet />
            </main>
            <Footer />
          </div>
       
        </div>
      </div>
    </div>
  );
}