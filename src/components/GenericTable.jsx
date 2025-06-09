export default function GenericTable({ columns, data, renderRow }) {
    return (
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-blue-50">
            <table className="min-w-full divide-y divide-blue-200 rounded-2xl">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className="px-6 py-4 text-lg font-semibold tracking-wide text-center"
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100 text-base">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="py-8 text-center text-blue-400">
                                Tidak ada data.
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr
                                key={index}
                                className={
                                    index % 2 === 0
                                        ? "bg-blue-50 hover:bg-blue-100 transition"
                                        : "bg-white hover:bg-blue-100 transition"
                                }
                            >
                                {renderRow(item, index)}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}