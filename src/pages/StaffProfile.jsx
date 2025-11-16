import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { getAll } from '../utils/db'

export default function StaffProfile(){
  const {id} = useParams()
  const staff = getAll('staff').find(s=>s.id===id)
  if(!staff) return <div className="card">Staff not found</div>
  return (
    <div>
      <div className="card" style={{display:'flex',gap:12,alignItems:'center'}}>
        <div>
          {staff.photo ? <img src={staff.photo} alt="profile" style={{width:96,height:96,objectFit:'cover',borderRadius:8}} /> : <div style={{width:96,height:96,background:'#eee',display:'flex',alignItems:'center',justifyContent:'center'}}>No Photo</div>}
        </div>
        <div>
          <h2>{staff.name}</h2>
          <div>Phone: {staff.phone}</div>
          <div>Role: {staff.role}</div>
          <div>Hourly: ₹{staff.hourly}</div>
        </div>
      </div>
      <div className="row" style={{gap:12,marginTop:12}}>
        <Link to="/attendance"><button>Mark Attendance</button></Link>
        <Link to={'/payslip/'+staff.id}><button>Generate Payslip</button></Link>
      </div>
    </div>
  )
}
