import * as FaIcons from "react-icons/fa";
import Breadcrumb from "../components/Breadcrumb";
import Data from "../assets/Data.json";
import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const Datapengunjung = [
        { day: "Sen", pengunjung: 800 },
        { day: "Sel", pengunjung: 967 },
        { day: "Rab", pengunjung: 1098 },
        { day: "Kam", pengunjung: 1200 },
        { day: "Jum", pengunjung: 989 },
        { day: "Sab", pengunjung: 870 },
        { day: "Min", pengunjung: 1340 },
      ];
  return (
    <div className="w-full min-h-screen p-8 bg-white">
      <Breadcrumb title="Dashboard" breadcrumb="Dashboard">
        <button className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded-lg transition">
          Add Button
        </button>
      </Breadcrumb>
      <div className="mt-6 mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800 rounded">
        {error ? (
          error
        ) : (
          <>
            <span className="italic">"{quote}"</span>
            <span className="block text-sm text-gray-500 mt-1">
              — Advice of the Day
            </span>
          </>
        )}
      </div>
      <div
        id="dashboard-container"
        className="grid gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3"
      >
        {Data.map((order) => {
          const IconComponent = FaIcons[order.icon];
          return (
            <CardCount
              key={order.id}
              icon={IconComponent}
              text={order.text}
              count={order.count}
              change={order.change}
              changeType={order.changeType}
            />
          );
        })}
      </div>
      <h2 className="text-xl font-bold mt-10 mb-4">
        Statistik Pengunjung Mingguan
      </h2>
      <div className="bg-white p-4 rounded-xl shadow-md">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={Datapengunjung}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="pengunjung"
              stroke="#3B82F6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CardCount({ icon: Icon, text, count, change, changeType }) {
    
    const changeColor =
      changeType === "positive"
        ? "text-green-600 bg-green-100"
        : "text-red-600 bg-red-100";
  
    return (
      <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-4 min-w-[220px]">
        {/* Icon besar */}
        <div className="text-blue-500 bg-white rounded-xl p-4 text-3xl shadow-sm">
          <Icon />
        </div>
  
        {/* Text info */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 font-medium">{text}</span>
          <span className="text-2xl font-bold text-gray-800">{count}</span>
          <span className={`mt-1 px-2 py-1 text-xs rounded-full w-fit ${changeColor}`}>
            {change}
          </span>
        </div>
      </div>
    );
  }