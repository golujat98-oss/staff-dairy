import React, {useEffect, useState} from 'react';
import supabase from '../supabase';

export default function ApprovalRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetchRequests();
    // realtime subscription could be added
  },[]);

  async function fetchRequests() {
    setLoading(true);
    const { data, error } = await supabase
      .from('attendance_requests')
      .select('id, staff_id, staff_name, staff_code, request_type, requested_time, status, note')
      .order('requested_time', {ascending: false})
      .limit(100);
    if (error) {
      console.error("Error fetching requests", error);
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  }

  async function handleDecision(id, decision) {
    // decision = 'approved' | 'rejected'
    const { error } = await supabase
      .from('attendance_requests')
      .update({ status: decision, reviewed_at: new Date().toISOString() })
      .eq('id', id);
    if (error) {
      alert('Error updating request: ' + error.message);
    } else {
      // If approved and it's a check-in or check-out, also create/complete attendance row
      const req = requests.find(r=>r.id===id);
      if (decision === 'approved' && req) {
        if (req.request_type === 'checkin') {
          await supabase.from('attendances').insert([{
            staff_id: req.staff_id,
            checkin_time: req.requested_time,
            status: 'approved'
          }]);
        } else if (req.request_type === 'checkout') {
          // find today's attendance and update checkout
          const { data: att } = await supabase.from('attendances')
            .select('*')
            .eq('staff_id', req.staff_id)
            .order('id', {ascending:false})
            .limit(1);
          if (att && att.length>0) {
            await supabase.from('attendances').update({
              checkout_time: req.requested_time,
              status: 'completed'
            }).eq('id', att[0].id);
          }
        }
      }
      fetchRequests();
    }
  }

  if (loading) return <div>Loading approval requests...</div>;

  if (!requests.length) return <div>No pending approval requests.</div>;

  return (
    <div className="approval-requests">
      <h3>Attendance Approval Requests</h3>
      <div style={{display:'grid', gap:12}}>
        {requests.map(r => (
          <div key={r.id} style={{border:'1px solid #e5e7eb', padding:12, borderRadius:8}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <strong>{r.staff_name} ({r.staff_code})</strong>
                <div style={{color:'#6b7280'}}>{r.request_type.toUpperCase()} • {new Date(r.requested_time).toLocaleString()}</div>
                {r.note && <div style={{marginTop:6}}><em>Note: {r.note}</em></div>}
              </div>
              <div style={{display:'flex', gap:8}}>
                <button onClick={()=>handleDecision(r.id,'approved')}>Approve</button>
                <button onClick={()=>handleDecision(r.id,'rejected')}>Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
