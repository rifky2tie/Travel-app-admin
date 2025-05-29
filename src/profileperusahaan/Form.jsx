import React, { useState } from "react";
import { InputField, SelectField, ErrorMessage } from "./components/komponen.jsx";

export default function Form() {
    const [formData, setFormData] = useState({ name: "", address: "", location: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const isNameValid = formData.name.trim() && !/\d/.test(formData.name);
    const isAddressValid = formData.address.trim();
    const isLocationValid = formData.location;

    const isValid = isNameValid && isAddressValid && isLocationValid;

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url(pexels-pixabay-62623.jpg)] bg-cover bg-center">
            <div className="bg-white/10 backdrop-blur-lg p-8 shadow-lg w-96 border border-white/30">
                <div className="w-full bg-transparent border-b border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-white">
                    <h2 className="text-center text-xl font-semibold text-[#ffff]">Form Perusahaan</h2>
                    
                    <InputField 
                        label="Nama Perusahaan" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        errorMessage={!isNameValid ? "*Nama tidak boleh kosong atau mengandung angka" : ""}
                    />
                    <InputField 
                        label="Alamat" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        errorMessage={!isAddressValid ? "*Alamat tidak boleh kosong" : ""}
                    />
                    <SelectField 
                        label="Lokasi" 
                        name="location" 
                        value={formData.location} 
                        onChange={handleChange} 
                        options={["Pekanbaru", "Jambi", "Palembang", "Bengkulu", "Lampung"]} 
                        errorMessage={!isLocationValid ? "*Lokasi harus dipilih" : ""}
                    />

                    {!isValid ? (
                        <ErrorMessage message="Pastikan semua input valid sebelum submit." />
                    ) : (
                        <button className="w-full bg-[#3232C4] text-white p-2 rounded-lg hover:bg-opacity-80 hover:scale-105 transition mt-4 focus:outline-none">
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
