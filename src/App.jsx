import AdminManagement from './components/AdminManagement';
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import StaffList from './pages/StaffList'
import AddStaff from './pages/AddStaff'
import StaffProfile from './pages/StaffProfile'
import AttendancePage from './pages/Attendance'
import Payments from './pages/Payments'
import Payslip from './pages/Payslip'
import Complaints from './pages/Complaints'
import Uploads from './pages/Uploads'
import StaffHome from './pages/StaffHome'
import { initDemoData } from './utils/db'

initDemoData()

export default function App(){
  return (
    <div>
      <nav className="topnav">
        <Link to="/">Login</Link>
        <Link to="/dashboard">Admin</Link>
        <Link to="/staff">Staff</Link>
        <Link to="/attendance">Attendance</Link>
        <Link to="/payments">Payments</Link>
        <Link to="/complaints">Complaints</Link>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/staff" element={<StaffList />} />
          <Route path="/add-staff" element={<AddStaff />} />
          <Route path="/staff/:id" element={<StaffProfile />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/payslip/:id" element={<Payslip />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/uploads" element={<Uploads />} />
          <Route path="/staff-home" element={<StaffHome />} />
          <Route path="/admin-management" element={<AdminManagement />} />
        </Routes>
      </main>
    </div>
  )
}
