import React from 'react'
export default function StaffHome(){
  const user = JSON.parse(localStorage.getItem('staff_diary_user')||'null')
  return (
    <div>
      <h2>Staff Home</h2>
      <div className="card">
        <div>Logged in as: {user?.phone || 'Guest'}</div>
        <div style={{marginTop:8}}>
          <a href="/attendance">Mark Attendance</a> • <a href="/uploads">Upload Work</a>
        </div>
      </div>
    </div>
  )
}
