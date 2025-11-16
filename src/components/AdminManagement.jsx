
import React, {useEffect, useState} from 'react';
import supabase from '../supabase';

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({name:'', email:'', password:'', role:'admin', job_role:''});

  useEffect(()=>{ fetchAdmins(); },[]);

  async function fetchAdmins(){
    setLoading(true);
    const { data, error } = await supabase.from('users').select('id,name,email,role,job_role,staff_code,created_at').order('created_at',{ascending:false});
    if(error) console.error(error);
    else setAdmins(data || []);
    setLoading(false);
  }

  async function createAdmin(e){
    e.preventDefault();
    setLoading(true);
    // NOTE: In production, backend should hash password; this demo stores plain - replace with server function
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
      job_role: form.job_role,
      staff_code: form.staff_code || ('SD-' + Math.floor(1000 + Math.random()*9000))
    };
    const { data, error } = await supabase.from('users').insert([payload]);
    if(error) alert('Error: ' + error.message);
    else {
      setForm({name:'',email:'',password:'',role:'admin',job_role:''});
      fetchAdmins();
    }
    setLoading(false);
  }

  async function deleteAdmin(id){
    if(!confirm('Delete this user?')) return;
    const { error } = await supabase.from('users').delete().eq('id', id);
    if(error) alert('Error deleting: '+error.message);
    else fetchAdmins();
  }

  return (
    <div style={{padding:20}}>
      <h2>Admin Management</h2>
      <div style={{display:'flex',gap:20,marginTop:12}}>
        <div style={{flex:1}}>
          <form onSubmit={createAdmin} style={{display:'grid',gap:8}}>
            <input placeholder='Name' value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
            <input placeholder='Email' value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/>
            <input placeholder='Password' value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/>
            <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
              <option value='admin'>Admin</option>
              <option value='manager'>Manager</option>
            </select>
            <select value={form.job_role} onChange={e=>setForm({...form,job_role:e.target.value})}>
              <option value=''>-- Job Role --</option>
              <option value='chef'>Chef</option>
              <option value='waiter'>Waiter</option>
              <option value='cleaner'>Cleaner</option>
            </select>
            <button type='submit' disabled={loading}>Create Sub-Admin</button>
          </form>
        </div>
        <div style={{flex:1}}>
          <h3>Existing Admins & Managers</h3>
          {loading ? <div>Loading...</div> : (
            <div style={{display:'grid',gap:8}}>
              {admins.map(a=>(
                <div key={a.id} style={{border:'1px solid #eee',padding:8,borderRadius:6,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:600}}>{a.name} <small style={{color:'#666'}}>({a.role})</small></div>
                    <div style={{fontSize:12,color:'#666'}}>{a.email} • {a.job_role || '—'}</div>
                  </div>
                  <div>
                    <button onClick={()=>deleteAdmin(a.id)} style={{marginLeft:8}}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
