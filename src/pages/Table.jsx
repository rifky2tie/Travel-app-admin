import React from "react";

export default function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            {columns.map((column, index) => (
              <th key={index} className="py-3 px-6 text-left">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((row, rowIndex) => (
            <tr
            key={rowIndex}
            className={`border-b hover:bg-purple-50 transition ${
              rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-3 px-6 text-left">
                  {row[column] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}