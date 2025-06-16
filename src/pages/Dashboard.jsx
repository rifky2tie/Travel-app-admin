import * as FaIcons from "react-icons/fa";
import Breadcrumb from "../components/Breadcrumb";
import Data from "../assets/Data.json";
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
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Tokyo, Japan", value: 35, color: "#3498fd" },
  { name: "Sydney, Australia", value: 28, color: "#5fd0fa" },
  { name: "Paris, France", value: 22, color: "#b7e2fc" },
  { name: "Venice, Italy", value: 15, color: "#eaf6fe" },
];

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

  const [quote, setQuote] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.slip.advice);
      })
      .catch(() => {
        setError("Gagal mengambil quote inspirasi.");
      });
  }, []);

  return (
    
    <div className="w-full min-h-screen p-8 bg-white">
      <Breadcrumb title="Dashboard" breadcrumb="Dashboard"></Breadcrumb>
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
      <div className="flex gap-6 flex-row justify-center items-center">
        <div className="w-full">
          <h2 className=" text-xl font-bold mt-10 mb-4">
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
        <div className="mt-20 w-[full]">
          <TopDestinations />
        </div>
        <div className="mt-20 w-[full]">
          <calendar-date class="cally bg-base-100 border border-base-300 shadow-lg rounded-box">
          <svg aria-label="Previous" className="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
          <svg aria-label="Next" className="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
          <calendar-month></calendar-month>
          </calendar-date>
        </div>
      </div>
      <TotalTrips />
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
        <span
          className={`mt-1 px-2 py-1 text-xs rounded-full w-fit ${changeColor}`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}

function TopDestinations() {
  return (
    <div className="bg-white rounded-xl shadow p-6 w-[350px]">
      <div className="flex justify-between items-center mb-5">
        <span className="font-semibold text-lg">Top Destinations</span>
        <button className="bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium">
          This Month <span className="ml-1">▼</span>
        </button>
      </div>
      <div className="flex items-center">
        <PieChart width={110} height={110}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={32}
            outerRadius={50}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        <div className="ml-6">
          {data.map((item) => (
            <div className="flex items-start mb-3" key={item.name}>
              <span
                className="w-3 h-3 rounded-full mt-1 mr-3"
                style={{ background: item.color }}
              ></span>
              <div>
                <span className="text-sm text-gray-800 font-medium">
                  {item.name}{" "}
                  <span className="font-bold text-gray-700">
                    ({item.value}%)
                  </span>
                </span>
                <div className="text-xs text-gray-400">2,458 Participants</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TotalTrips() {
  // Data
  const done = 620;
  const booked = 465;
  const canceled = 115;
  const total = done + booked + canceled;

  // Persentase untuk progress bar
  const donePercent = (done / total) * 100;
  const bookedPercent = (booked / total) * 100;
  const canceledPercent = (canceled / total) * 100;

  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center w-[530px] mt-6">
      {/* Icon */}
      <div className="bg-blue-50 rounded-lg p-3 flex items-center justify-center mr-4">
        {/* Heroicons airplane icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.5 12.5l7.5-2.5-7.5-2.5V4l12 4v2l-12 4v-2.5zM3 21v-2.5l7.5-2.5v2.5L3 21z"
          />
        </svg>
      </div>
      {/* Info & Progress */}
      <div className="flex-1">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-sm text-gray-500 font-medium">Total Trips</div>
            <div className="text-2xl font-bold text-gray-900">1,200</div>
          </div>
          {/* Progress Bar */}
          <div className="flex-1 ml-6">
            <div className="w-full h-3 bg-blue-50 rounded-full flex overflow-hidden">
              <div
                className="bg-blue-100"
                style={{ width: `${donePercent}%` }}
              ></div>
              <div
                className="bg-blue-200"
                style={{ width: `${bookedPercent}%` }}
              ></div>
              <div
                className="bg-blue-500"
                style={{ width: `${canceledPercent}%` }}
              ></div>
            </div>
            {/* Legend */}
            <div className="flex gap-6 mt-2 text-sm">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-100 mr-2"></span>
                <span className="text-gray-400 font-semibold">Done</span>
                <span className="ml-1 font-bold text-gray-600">{done}</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-200 mr-2"></span>
                <span className="text-gray-400 font-semibold">Booked</span>
                <span className="ml-1 font-bold text-gray-600">{booked}</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                <span className="text-blue-500 font-semibold">Canceled</span>
                <span className="ml-1 font-bold text-gray-600">{canceled}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
