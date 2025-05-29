import frameworkData from "./frameworkrok.json"; // Import JSON

export default function Frameworklist() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {frameworkData.map((item) => (
        <div
          key={item.id}
          className="border p-4 rounded-lg shadow-md bg-white"
        >
          {/* Foto Karyawan */}
          <img
            src={item.image ? item.image : "/default-avatar.png"} // Gambar default jika tidak ada foto
            className="w-24 h-24 rounded-full mx-auto mb-4"
            alt={item.name}
          />
          
          {/* Nama dan Jabatan */}
          <h2 className="text-lg font-bold text-gray-800 text-center">{item.name}</h2>
          <p className="text-gray-600 text-center">{item.position}</p>

           {/* Email */} 
          <p className="text-sm text-gray-500">{item.email}</p>

           {/* No. HP */}
          <p className="text-sm text-gray-500">
             {item.contact.phone}
          </p>

           {/* Alamat */}
          <p className="text-sm text-gray-500">
             {item.contact.address.street}, {item.contact.address.city}, {item.contact.address.country}
          </p>

            {/* Proyek */}
            <div className="mt-3">
            <h3 className="text-sm font-bold text-gray-700">Proyek:</h3>
            <ul className="text-sm text-gray-600">
              {item.projects.map((proj, index) => (
                <li key={index}>🔹 {proj.name} ({proj.year})</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
  