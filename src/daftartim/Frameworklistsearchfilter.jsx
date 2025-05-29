import { useState } from "react";
import frameworkData from "./framework.json";

export default function Frameworklistsearchfilter() {
  const [dataForm, setDataForm] = useState({
    searchName: "",
    selectedJabatan: "",
    selectedFoto: "all",
  });

  // Handle perubahan nilai input form
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const _searchName = dataForm.searchName.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch = framework.name.toLowerCase().includes(_searchName);
    const matchesJabatan = dataForm.selectedJabatan
      ? framework.position === dataForm.selectedJabatan
      : true;

      const hasPhoto = framework.image && framework.image.trim() !== "";

    const matchesFoto =
      dataForm.selectedFoto === "all" ||
      (dataForm.selectedFoto === "withPhoto" && hasPhoto) ||
      (dataForm.selectedFoto === "withoutPhoto" && !hasPhoto);

      return matchesSearch && matchesJabatan && matchesFoto;
  });

  // Ambil daftar unik posisi/jabatan dari data JSON
  const allJabatans = [
    ...new Set(frameworkData.map((framework) => framework.position)),
  ];

  return (
    <div
      className={`p-8 min-h-screen bg-[url('/pexels-pixabay-62623.jpg')] bg-cover bg-center `}
    >
      <center>
        <h2 className="text-2xl font-bold mb-6 text-white ">DAFTAR KARYAWAN</h2>
      </center>

      {/* Input pencarian */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Cari nama..."
          className="w-full p-2 border rounded mb-4 bg-white/80 backdrop-blur-md  w-1/2 max-w-sm"
          value={dataForm.searchName}
          name="searchName"
          onChange={handleChange}
        />

        {/* Dropdown untuk filter jabatan */}
        <select
          className="w-full p-2 border rounded mb-4 bg-white/80 backdrop-blur-md w-1/2 max-w-sm "
          value={dataForm.selectedJabatan}
          name="selectedJabatan"
          onChange={handleChange}
        >
          <option value="">Semua Jabatan</option>
          {allJabatans.map((jabatan, index) => (
            <option key={index} value={jabatan}>
              {jabatan}
            </option>
          ))}
        </select>
      
      <select
        className="w-full p-2 border rounded mb-4 bg-white/80 backdrop-blur-md w-1/2 max-w-sm"
        value={dataForm.selectedFoto}
        name="selectedFoto"
        onChange={handleChange}
      >
        <option value="all">Semua</option>
        <option value="withPhoto">Dengan Foto</option>
        <option value="withoutPhoto">Tanpa Foto</option>
      </select>
      </div>
      {/* Tabel Daftar Karyawan */}
      
      <div className="overflow-x-auto w-full p-4 bg-white/80 shadow-lg backdrop-blur-lg rounded-md ">
        <table className="w-full border-collapse border border-gray-300 ">
          <thead>
            <tr className="bg-white/70">
              <th className="border p-2">ID</th>
              <th className="border p-2">Nama</th>
              <th className="border p-2">Jabatan</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">No. HP</th>
              <th className="border p-2">Alamat</th>
              <th className="border p-2">Proyek</th>
              <th className="border p-2">Foto</th>
            </tr>
          </thead>
          <tbody>
            {filteredFrameworks.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100 transition duration-100 text-center">
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.position}</td>
                <td className="border p-2">{item.email}</td>
                <td className="border p-2">{item.contact.phone}</td>
                <td className="border p-2">
                  {item.contact.address.street}, {item.contact.address.city},{" "}
                  {item.contact.address.country}
                </td>
                <td className="border p-2">
                  {item.projects.map((proj, index) => (
                    <div key={index}>
                      {proj.name} ({proj.year})
                    </div>
                  ))}
                </td>
                <td className="border p-2">
                  {item.image ? (
                    <img
                      src={item.image}
                      className="w-12 h-12 rounded-full mx-auto"
                      alt={item.name}
                    />
                  ) : (
                    <span className="text-gray-400">No Photo</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
  
  );
}
