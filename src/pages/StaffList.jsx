import React, { useEffect, useState } from "react";
import "./stafflist.css";
import { getAllStaff } from "../utils/db";

export default function StaffList() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    setStaff(getAllStaff());
  }, []);

  return (
    <div className="staff-container">
      <h2>All Staff</h2>

      <table className="staff-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Code</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((s, index) => (
            <tr key={index}>
              <td>{s.name}</td>
              <td>
                <span className={`role-badge ${s.role.toLowerCase()}`}>
                  {s.role}
                </span>
              </td>
              <td>{s.code}</td>
              <td>{s.phone}</td>
              <td>
                <span className="active-badge">Active</span>
              </td>
              <td>
                <button className="view-btn">View</button>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
