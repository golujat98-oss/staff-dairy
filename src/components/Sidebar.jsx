import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Staff List", link: "/staff" },
    { title: "Attendance", link: "/attendance" },
    { title: "Approvals", link: "/approvals" },
    { title: "Payments", link: "/payments" },
    { title: "Complaints", link: "/complaints" },
    { title: "Uploads", link: "/uploads" },
  ];

  return (
    <div className="w-60 min-h-screen bg-white shadow-md border-r">
      <div className="p-5 text-2xl font-bold text-blue-600">
        Staff Diary
      </div>

      <ul className="mt-3">
        {menu.map((item) => (
          <li key={item.link}>
            <Link
              to={item.link}
              className={`block px-5 py-3 text-sm font-medium ${
                pathname === item.link
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
