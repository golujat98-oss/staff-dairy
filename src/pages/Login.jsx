import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Login(){
  const [phone,setPhone]=useState('')
  const [otp,setOtp]=useState('')
  const [sent,setSent]=useState(false)
  const nav = useNavigate()

  async function sendOtp(e){
    e?.preventDefault()
    if(phone.length<10){ alert('Enter valid phone'); return }
    const full = '+91'+phone.replace(/[^0-9]/g,'')
    const { data, error } = await supabase.auth.signInWithOtp({ phone: full })
    if(error){ console.error(error); alert('Error sending OTP: '+error.message); return }
    setSent(true)
    alert('OTP sent to '+full)
  }

  async function verify(e){
    e?.preventDefault()
    if(!sent){ alert('Please request OTP first'); return }
    if(!otp){ alert('Enter OTP'); return }
    const { data, error } = await supabase.auth.verifyOtp({ phone: '+91'+phone.replace(/[^0-9]/g,''), token: otp, type: 'sms' })
    if(error){ console.error(error); alert('OTP verify failed: '+error.message); return }
    // store minimal user info
    localStorage.setItem('staff_diary_user', JSON.stringify({phone: '+91'+phone}))
    alert('Login successful')
    nav('/staff-home')
  }

  return (
    <div className="card" style={{maxWidth:420}}>
      <h2>Login with OTP (Supabase)</h2>
      <form onSubmit={sendOtp}>
        <label>Mobile Number</label>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="98765xxxxx" />
        <div style={{marginTop:8}}>
          <button onClick={sendOtp} type="button">Send OTP</button>
        </div>

        <div style={{marginTop:12}}>
          <label>Enter OTP</label>
          <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="6-digit OTP" />
          <div style={{marginTop:8}}>
            <button onClick={verify} type="button">Verify OTP</button>
          </div>
        </div>
      </form>
    </div>
  )
}
