import React from "react";

export function InputField({ label, name, value, onChange, errorMessage }) {
    return (
        <div className="mb-4">
            <label className="block text-[#ffff] font-medium mb-1">{label}</label>
            <input 
                type="text" 
                name={name} 
                placeholder={label}
                value={value} 
                onChange={onChange} 
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffff] transition-colors duration-200"
            />
            {/* Tampilkan pesan kesalahan jika ada */}
            {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
        </div>
    );
}

export function SelectField({ label, name, value, onChange, options, errorMessage }) {
    return (
        <div className="mb-4">
            <label className="block text-[#ffff] font-medium mb-1">{label}</label>
            <select 
                name={name} 
                value={value} 
                onChange={onChange} 
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffff] transition-colors duration-200"
            >
                <option value="">Pilih {label}</option>
                {options.map((option) => (
                    <option key={option} value={option.toLowerCase()} className="text-black">
                        {option}
                    </option>
                ))}
            </select>
            {/* Tampilkan pesan kesalahan jika ada */}
            {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
        </div>
    );
}

export function ErrorMessage({ message }) {
    return (
        <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <p className="font-semibold">{message}</p>
        </div>
    );
}