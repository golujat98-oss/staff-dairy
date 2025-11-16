import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { upsertStaff } from '../utils/db'
import { supabase } from '../supabase'

export default function AddStaff(){
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')
  const [role,setRole]=useState('Waiter')
  const [hourly,setHourly]=useState(60)
  const [file,setFile]=useState(null)
  const nav = useNavigate()

  async function uploadProfile(staffId){
    if(!file) return ''
    const path = `profiles/${staffId}/${file.name}`
    const { data, error } = await supabase.storage.from('profiles').upload(path, file, { upsert: true })
    if(error){ console.error('upload err', error); return '' }
    const { data: urlData } = supabase.storage.from('profiles').getPublicUrl(path)
    return urlData.publicUrl || ''
  }

  async function handleSave(e){
    e.preventDefault()
    const id = 'w'+Date.now().toString(36)
    let photoUrl = ''
    if(file){
      photoUrl = await uploadProfile(id)
    }
    upsertStaff({id,name,phone,role,hourly,photo:photoUrl})
    nav('/staff')
  }

  return (
    <div className="card" style={{maxWidth:600}}>
      <h2>Add Staff</h2>
      <form onSubmit={handleSave}>
        <label>Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} required />
        <label>Phone</label>
        <input value={phone} onChange={e=>setPhone(e.target.value)} required />
        <label>Role</label>
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option>Waiter</option><option>Cook</option><option>Cleaner</option><option>Helper</option>
        </select>
        <label>Hourly Rate (₹)</label>
        <input type="number" value={hourly} onChange={e=>setHourly(e.target.value)} />
        <label>Profile Photo (optional)</label>
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
        <div style={{marginTop:8}}>
          <button type="submit">Save Staff</button>
        </div>
      </form>
    </div>
  )
}
