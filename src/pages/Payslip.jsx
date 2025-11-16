import React from 'react'
import { useParams } from 'react-router-dom'
import { getAll } from '../utils/db'

export default function Payslip(){
  const {id} = useParams()
  const staff = getAll('staff').find(s=>s.id===id)
  if(!staff) return <div className="card">Staff not found</div>

  // Simple payslip: fixed hours, hourly * hours
  const hours = 8*30 // demo
  const gross = staff.hourly * hours
  const deductions = Math.round(gross * 0.05)
  const net = gross - deductions

  return (
    <div className="card" style={{maxWidth:720}}>
      <h2>Payslip — {staff.name}</h2>
      <div>Month: Sample</div>
      <table style={{width:'100%',marginTop:8}}>
        <tbody>
          <tr><td>Hours</td><td>{hours}</td></tr>
          <tr><td>Hourly Rate</td><td>₹{staff.hourly}</td></tr>
          <tr><td>Gross</td><td>₹{gross}</td></tr>
          <tr><td>Deductions</td><td>₹{deductions}</td></tr>
          <tr><td><strong>Net Pay</strong></td><td><strong>₹{net}</strong></td></tr>
        </tbody>
      </table>
    </div>
  )
}
