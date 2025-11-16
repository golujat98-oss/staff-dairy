import React, {useState} from 'react'
import { addComplaint, getComplaints, getAll } from '../utils/db'

export default function Complaints(){
  const staff = getAll('staff')
  const [sel,setSel]=useState(staff[0]?.id||'')
  const [text,setText]=useState('')
  function handleSubmit(e){
    e.preventDefault()
    if(!text) return alert('Enter complaint')
    addComplaint({id:'c'+Date.now().toString(36), staffId:sel, text, time:new Date().toISOString()})
    setText('')
    alert('Complaint submitted')
  }
  return (
    <div>
      <h2>Complaints</h2>
      <form onSubmit={handleSubmit} style={{maxWidth:520}}>
        <label>Staff</label>
        <select value={sel} onChange={e=>setSel(e.target.value)}>
          {staff.map(s=> <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <label>Complaint</label>
        <textarea value={text} onChange={e=>setText(e.target.value)} />
        <div style={{marginTop:8}}><button type="submit">Submit</button></div>
      </form>

      <h3 style={{marginTop:18}}>Recent</h3>
      <div className="list">
        {getComplaints().slice().reverse().map(c=>(
          <div key={c.id} className="card">
            <div><strong>{c.staffId}</strong> — {new Date(c.time).toLocaleString()}</div>
            <div>{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
