import { BsDatabaseExclamation } from "react-icons/bs"; 

export default function EmptyState({ text = "Belum ada data" }) {
    return (
        <div className="flex flex-col items-center justify-center p-10 bg-blue-50 rounded-2xl border border-blue-100 shadow-inner">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4 shadow">
                <BsDatabaseExclamation className="text-blue-400 text-4xl" />
            </div>
            <p className="text-blue-700 text-lg font-semibold mb-1">{text}</p>
            <p className="text-blue-400 text-sm">Silakan tambahkan data baru untuk memulai.</p>
        </div>
    );
}
