import React from 'react'
import { Link } from 'react-router-dom'
import { getAll } from '../utils/db'

export default function StaffList(){
  const staff = getAll('staff')
  return (
    <div>
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <h2>Staff</h2>
        <Link to="/add-staff"><button>Add Staff</button></Link>
      </div>
      <div className="list">
        {staff.map(s=>(
          <div key={s.id} className="card row">
            <div style={{flex:1}}>
              <strong>{s.name}</strong><div style={{fontSize:12}}>{s.role} • {s.phone}</div>
            </div>
            <div>
              <Link to={'/staff/'+s.id}><button>View</button></Link>
            </div>
          </div>
        ))}
        {staff.length===0 && <div className="card">No staff yet.</div>}
      </div>
    </div>
  )
}
