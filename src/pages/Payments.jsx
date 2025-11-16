import React, {useState} from 'react'
import { getAll, addPayment } from '../utils/db'

export default function Payments(){
  const staff = getAll('staff')
  const [sel,setSel]=useState(staff[0]?.id||'')
  const [amount,setAmount]=useState(0)
  const [note,setNote]=useState('')

  function handlePay(e){
    e.preventDefault()
    if(!sel) return alert('Select staff')
    addPayment({id:'p'+Date.now().toString(36), staffId:sel, amount:Number(amount), note, time:new Date().toISOString()})
    alert('Payment recorded')
  }

  return (
    <div>
      <h2>Payments</h2>
      <form onSubmit={handlePay} style={{maxWidth:420}}>
        <label>Staff</label>
        <select value={sel} onChange={e=>setSel(e.target.value)}>
          {staff.map(s=> <option value={s.id} key={s.id}>{s.name}</option>)}
        </select>
        <label>Amount (₹)</label>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} />
        <label>Note</label>
        <input value={note} onChange={e=>setNote(e.target.value)} />
        <div style={{marginTop:8}}>
          <button type="submit">Pay</button>
        </div>
      </form>

      <h3 style={{marginTop:18}}>Recent Payments</h3>
      <div className="list">
        {getAll('payments').slice().reverse().map(p=>(
          <div key={p.id} className="card row" style={{justifyContent:'space-between'}}>
            <div>{p.staffId} — ₹{p.amount} — {new Date(p.time).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
