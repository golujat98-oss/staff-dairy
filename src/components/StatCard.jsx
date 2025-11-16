import React from "react";

export default function StatCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold text-gray-800 mt-2">{value}</h2>
    </div>
  );
}
