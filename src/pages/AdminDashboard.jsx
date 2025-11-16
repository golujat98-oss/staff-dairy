import React from 'react'
import { getAll } from '../utils/db'

export default function AdminDashboard(){
  const staff = getAll('staff')
  const attendance = getAll('attendance')
  const payments = getAll('payments')
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="row" style={{gap:18}}>
        <div className="card" style={{flex:1}}>
          <h3>Total Staff</h3>
          <div style={{fontSize:22}}>{staff.length}</div>
        </div>
        <div className="card" style={{flex:1}}>
          <h3>Attendance Records</h3>
          <div style={{fontSize:22}}>{attendance.length}</div>
        </div>
        <div className="card" style={{flex:1}}>
          <h3>Payments</h3>
          <div style={{fontSize:22}}>{payments.length}</div>
        </div>
      </div>
    </div>
  )
}
