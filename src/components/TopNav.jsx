import React from "react";

export default function TopNav({ title }) {
  return (
    <div className="w-full px-6 py-4 bg-white border-b shadow-sm flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>

      <div className="text-gray-600 text-sm">
        Admin Panel
      </div>
    </div>
  );
}
