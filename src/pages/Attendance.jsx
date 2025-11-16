import React, {useState, useEffect} from 'react';
import supabase, { createAttendanceRequest } from '../supabase';

export default function Attendance() {
  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState('');

  async function handleCheckIn() {
    setLoading(true);
    setMessage('Creating check-in request...');
    // example staff payload - in real app, get current user info from auth/context
    const staff = JSON.parse(localStorage.getItem('current_staff') || '{}');
    const payload = {
      staff_id: staff.id || 0,
      staff_name: staff.name || 'Unknown',
      staff_code: staff.code || 'SD-000',
      request_type: 'checkin',
      requested_time: new Date().toISOString(),
      status: 'pending',
      note: ''
    };
    const { data, error } = await createAttendanceRequest(payload);
    if (error) {
      setMessage('Error creating request: ' + error.message);
    } else {
      setMessage('Check-in request sent. Waiting for admin approval.');
    }
    setLoading(false);
  }

  async function handleCheckOut() {
    setLoading(true);
    setMessage('Creating check-out request...');
    const staff = JSON.parse(localStorage.getItem('current_staff') || '{}');
    const payload = {
      staff_id: staff.id || 0,
      staff_name: staff.name || 'Unknown',
      staff_code: staff.code || 'SD-000',
      request_type: 'checkout',
      requested_time: new Date().toISOString(),
      status: 'checkout_pending',
      note: ''
    };
    const { data, error } = await createAttendanceRequest(payload);
    if (error) {
      setMessage('Error creating request: ' + error.message);
    } else {
      setMessage('Check-out request sent. Waiting for admin approval.');
    }
    setLoading(false);
  }

  return (
    <div style={{padding:20}}>
      <h2>Attendance</h2>
      <div style={{marginTop:12}}>
        <button onClick={handleCheckIn} disabled={loading}>Request Check-In</button>
        <button onClick={handleCheckOut} disabled={loading} style={{marginLeft:8}}>Request Check-Out</button>
      </div>
      {message && <div style={{marginTop:12}}>{message}</div>}
    </div>
  );
}
