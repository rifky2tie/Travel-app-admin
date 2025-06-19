import * as FaIcons from "react-icons/fa";
import Data from "../assets/Data.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceLine,
} from "recharts";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Tokyo, Japan", value: 35, color: "#3498fd" },
  { name: "Sydney, Australia", value: 28, color: "#5fd0fa" },
  { name: "Paris, France", value: 22, color: "#b7e2fc" },
  { name: "Venice, Italy", value: 15, color: "#eaf6fe" },
];

const revenueData = [
  { name: "Sun", value: 400 },
  { name: "Mon", value: 420 },
  { name: "Tue", value: 350 },
  { name: "Wed", value: 635 },
  { name: "Thu", value: 480 },
  { name: "Fri", value: 600 },
  { name: "Sat", value: 570 },
];

export default function Dashboard() {
  const [travelPackages, setTravelPackages] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/data/travelPackages.json")
      .then((res) => res.json())
      .then(setTravelPackages);

    fetch("/data/message.json")
      .then((res) => res.json())
      .then((data) => setMessages(data.chats || []));
  }, []);

  return (
    <div className="w-full min-h-screen p-8 bg-white max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        {/* Main Content */}
        <div className="xl:col-span-3 flex flex-col gap-6 mt-[-18px]">
          {/* Top Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          {/* Revenue & Destinations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevenueOverview />
            <TopDestinations />
          </div>
          {/* Grid: Total Trips, Travel Packages, Messages */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Total Trips & Travel Packages */}
            <div className="lg:col-span-2 flex flex-col gap-6 mt-[-22px]">
              <TotalTrips />
              {/* Travel Packages */}
              <div>
                <div className="flex justify-between items-center mb-3 mt-2">
                  <span className="font-semibold text-lg">Travel Packages</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Sort by:</span>
                    <button className="border px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
                      Latest
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="#555"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <button className="ml-2 border px-3 py-1 rounded-lg text-sm font-medium">
                      View All
                    </button>
                  </div>
                </div>
                {/* Tambahkan wrapper bg-blue-50 dan padding */}
                <div className="bg-blue-50 rounded-2xl p-4 flex gap-5 h-[320px]">
                  {travelPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="bg-white rounded-2xl p-3 w-[230px] flex flex-col items-center shadow-sm"
                    >
                      <div className="relative w-full h-[170px] mb-3">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <span className="absolute top-2 left-2 bg-white text-blue-400 text-xs font-semibold px-2 py-0.5 rounded">
                          {pkg.label}
                        </span>
                      </div>
                      <div className="font-semibold text-gray-800 text-sm text-left w-full">
                        {pkg.title}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-[10px] mt-1 mb-2 text-left w-full">
                        <FaIcons.FaUsers className="inline mr-1" />
                        {pkg.days} Days / {pkg.nights} Nights
                      </div>
                      <div className="flex items-end justify-between w-full mt-auto">
                        <div>
                          <div className="text-[16px] font-bold text-blue-400">
                            {pkg.price}
                          </div>
                          <div className="text-[10px] text-gray-400">per person</div>
                        </div>
                        <button className="bg-blue-400 text-white px-4 py-1.5 rounded-lg text-xs font-semibold ml-auto">
                          See Detail
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Messages - full height, no scroll */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col h-full min-w-[270px] max-w-[320px]">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-base">Messages</span>
                <button className="text-gray-400 text-xl">
                  <FaIcons.FaEllipsisH />
                </button>
              </div>
              <div className="flex flex-col justify-between h-full gap-1">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-blue-50 transition ${
                      msg.unread ? "bg-blue-0" : ""
                    }`}
                  >
                    <div>
                      {msg.avatar ? (
                        <img
                          src={msg.avatar}
                          alt={msg.name}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                      ) : (
                        <FaIcons.FaUserCircle className="text-blue-400 text-2xl" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm text-gray-800 truncate">
                          {msg.name}
                        </span>
                        <span className="text-xs text-blue-400 font-semibold whitespace-nowrap">
                          {msg.time}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 truncate max-w-[150px]">
                        {msg.lastMessage}
                      </div>
                    </div>
                    {msg.unread && (
                      <span className="ml-2 w-6 h-6 flex items-center justify-center bg-blue-500 text-white text-xs rounded-md font-bold">
                        {msg.unreadCount || 1}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <RightSidebar className="mt-[-18px]" />
      </div>
    </div>
  );
}

function CardCount({ icon: Icon, text, count, change, changeType }) {
  return (
    <div className="bg-blue-50 rounded-2xl w-[287px] h-[85px] flex items-center gap-4 p-6 relative">
      <div className="bg-white rounded-xl p-4 text-3xl text-blue-400 flex items-center justify-center">
        <Icon />
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-xs text-gray-500 font-medium">{text}</span>
        <span className="text-xl font-bold text-gray-800">{count}</span>
      </div>
      <span
        className={`absolute right-6 bottom-4 px-3 py-1 text-xs rounded  font-semibold
        ${
          changeType === "positive"
            ? "bg-white "
            : "bg-red-200"
        }`}
      >
        {change}
      </span>
    </div>
  );
}

function RevenueOverview() {
  return (
    <div className="bg-white rounded-2xl border border-blue-100 p-8 h-[300px] min-w-[0] flex-1 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-gray-800 text-base">
          Revenue Overview
        </span>
        <button className="text-sm bg-blue-400 text-white px-4 py-1.5 rounded-lg font-medium flex items-center gap-1">
          Weekly
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              d="M6 9l6 6 6-6"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <div className="flex-1 flex items-center">
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            data={revenueData}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 14, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 14, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 800]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#3B82F6",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
            {/* Highlight Wednesday */}
            <ReferenceLine x="Wed" stroke="#3B82F6" strokeDasharray="4 2" />
            <ReferenceDot x="Wed" y={635} r={6} fill="#3B82F6" stroke="#fff" />
            {/* Custom Tooltip */}
            <Tooltip
              content={({ active, payload, label }) =>
                active && payload && payload.length ? (
                  <div className="bg-blue-100 px-3 py-2 rounded-lg shadow text-center">
                    <div className="font-bold text-gray-800 text-lg">
                      ${payload[0].value}
                    </div>
                    <div className="text-xs text-gray-500">12 Jul 28</div>
                  </div>
                ) : null
              }
              cursor={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function TopDestinations() {
  return (
    <div className="bg-white rounded-2xl border border-blue-100 p-8 h-[300px] min-w-[0] flex-1 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-5 ">
        <span className="font-semibold text-base">Top Destinations</span>
        <button className="bg-blue-400 text-white px-4 py-1.5 rounded-lg text-sm font-medium">
          This Month <span className="ml-1">▼</span>
        </button>
      </div>
      <div className="flex items-center flex-1">
        <PieChart width={120} height={120}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={38}
            outerRadius={55}
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
    <div className="bg-white rounded-2xl border border-blue-100 p-4 flex items-center w-[582px] mt-6 mx-auto">
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
      
      <div className="flex-1 ">
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
                className="bg-blue-400"
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
                <span className="w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
                <span className="text-blue-400 font-semibold">Canceled</span>
                <span className="ml-1 font-bold text-gray-600">{canceled}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RightSidebar({ className = "" }) {
  return (
    <aside className={`bg-white rounded-2xl border border-gray-200 p-4 flex flex-col gap-6 max-w-[300px] ${className}`}>
      {/* Calendar */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="font-bold text-base text-gray-800">July 2028</span>
          <div className="flex gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path
                  d="M15 19l-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path
                  d="M9 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="rounded-xl border border-gray-100 p-2 bg-gray-50 w-64 mx-auto">
          <table className="w-full text-center text-base select-none table-fixed">
            <thead>
              <tr className="text-gray-400">
                <th className="py-2 text-xs font-semibold">Sun</th>
                <th className="py-2 text-xs font-semibold">Mon</th>
                <th className="py-2 text-xs font-semibold">Tue</th>
                <th className="py-2 text-xs font-semibold">Wed</th>
                <th className="py-2 text-xs font-semibold">Thu</th>
                <th className="py-2 text-xs font-semibold">Fri</th>
                <th className="py-2 text-xs font-semibold">Sat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-gray-300 px-3 py-2">25</td>
                <td className="text-gray-300 px-3 py-2">26</td>
                <td className="text-gray-300 px-3 py-2">27</td>
                <td className="text-gray-300 px-3 py-2">28</td>
                <td className="text-gray-300 px-3 py-2">29</td>
                <td className="text-gray-300 px-3 py-2">30</td>
                <td className="px-3 py-2">1</td>
              </tr>
              <tr>
                <td className="px-3 py-2">2</td>
                <td className="px-3 py-2">3</td>
                <td className="px-3 py-2">10</td>
                <td className="px-3 py-2">11</td>
                {/* Mulai range */}
                <td className="bg-blue-400 text-white rounded-l-xl  px-3 py-2">
                  12
                </td>
                <td className="bg-blue-100 px-3 py-2">
                  13
                </td>
                <td className="bg-blue-100 px-3 py-2">
                  14
                </td>
                <td className="bg-blue-100 rounded-r-xl px-3 py-2">
                  15
                </td>
              </tr>
              <tr>
                <td className="bg-blue-100  rounded-l-xl px-3 py-2">
                  16
                  </td>
                <td className="bg-blue-100  px-3 py-2">
                  17
                </td>
                <td className="bg-blue-100   px-3 py-2">
                  18
                </td>
                <td className="bg-blue-400 text-white  rounded-r-xl px-3 py-2">
                  19
                </td>
                <td className="px-3 py-2">20</td>
                <td className="px-3 py-2">21</td>
                <td className="px-3 py-2">22</td>
              </tr>
              <tr>
                <td className="px-3 py-2">23</td>
                <td className="px-3 py-2">24</td>
                <td className="px-3 py-2">25</td>
                <td className="px-3 py-2">26</td>
                <td className="px-3 py-2">27</td>
                <td className="px-3 py-2">28</td>
                <td className="px-3 py-2">29</td>
              </tr>
              <tr>
                <td className="px-3 py-2">30</td>
                <td className="px-3 py-2">31</td>
                <td className="text-gray-300 px-3 py-2">1</td>
                <td className="text-gray-300 px-3 py-2">2</td>
                <td className="text-gray-300 px-3 py-2">3</td>
                <td className="text-gray-300 px-3 py-2">4</td>
                <td className="text-gray-300 px-3 py-2">5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Garis pemisah */}
      <hr className="my-3 border-t border-gray-200" />
      {/* Upcoming Trips */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-base text-gray-800">
            Upcoming Trips
          </span>
          <button className="bg-blue-400 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold shadow-sm">
            +
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {/* Trip 1 */}
          <div className="flex items-center gap-2 p-2 rounded-xl hover:bg-blue-50 transition">
            <img
              src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=44&h=44"
              alt="Paris"
              className="w-11 h-11 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex gap-1 mb-0.5">
                <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded font-semibold">
                  Romantic Getaway
                </span>
              </div>
              <div className="font-semibold text-gray-800 text-sm leading-tight">
                Paris, France
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                <span>
                  <span role="img" aria-label="avatar">
                    👩‍🦰
                  </span>
                  <span role="img" aria-label="avatar">
                    👨‍🦱
                  </span>
                  <span role="img" aria-label="avatar">
                    👩‍🦳
                  </span>
                  +9
                </span>
                <span className="ml-2">📅 5 - 10 July</span>
              </div>
            </div>
          </div>
          {/* Trip 2 */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-blue-50">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=44&h=44"
              alt="Tokyo"
              className="w-11 h-11 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex gap-1 mb-0.5">
                <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded font-semibold">
                  Cultural Exploration
                </span>
              </div>
              <div className="font-semibold text-gray-800 text-sm leading-tight">
                Tokyo, Japan
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                <span>
                  <span role="img" aria-label="avatar">
                    👩🏽‍🦰
                  </span>
                  <span role="img" aria-label="avatar">
                    👨🏾‍🦱
                  </span>
                  <span role="img" aria-label="avatar">
                    👩🏼‍🦳
                  </span>
                  +17
                </span>
                <span className="ml-2">📅 12 - 19 July</span>
              </div>
            </div>
          </div>
          {/* Trip 3 */}
          <div className="flex items-center gap-2 p-2 rounded-xl hover:bg-blue-50 transition">
            <img
              src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=44&h=44"
              alt="Sydney"
              className="w-11 h-11 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex gap-1 mb-0.5">
                <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded font-semibold">
                  Adventure Tour
                </span>
              </div>
              <div className="font-semibold text-gray-800 text-sm leading-tight">
                Sydney, Australia
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                <span>
                  <span role="img" aria-label="avatar">
                    👩🏻‍🦰
                  </span>
                  <span role="img" aria-label="avatar">
                    👨🏼‍🦱
                  </span>
                  <span role="img" aria-label="avatar">
                    👩🏾‍🦳
                  </span>
                  +12
                </span>
                <span className="ml-2">📅 15 - 24 July</span>
              </div>
            </div>
          </div>
          {/* Trip 4 */}
          <div className="flex items-center gap-2 p-2 rounded-xl hover:bg-blue-50 transition">
            <img
              src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=facearea&w=44&h=44"
              alt="New York"
              className="w-11 h-11 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex gap-1 mb-0.5">
                <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded font-semibold">
                  City Highlights
                </span>
              </div>
              <div className="font-semibold text-gray-800 text-sm leading-tight">
                New York, USA
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                <span>
                  <span role="img" aria-label="avatar">
                    👩🏿‍🦰
                  </span>
                  <span role="img" aria-label="avatar">
                    👨🏻‍🦱
                  </span>
                  <span role="img" aria-label="avatar">
                    👩‍🦳
                  </span>
                  +22
                </span>
                <span className="ml-2">📅 20 - 25 July</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
