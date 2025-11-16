/* LocalStorage-based DB with optional Supabase sync.
   This keeps the UI snappy (local operations) while also sending data to Supabase tables
   for persistence and multi-client visibility. */

const KEY = 'staff_diary_db_v1'

const defaultState = {
  staff: [],
  attendance: [],
  payments: [],
  complaints: [],
  uploads: []
}

function loadState(){
  try{
    const raw = localStorage.getItem(KEY)
    if(!raw) return structuredClone(defaultState)
    return JSON.parse(raw)
  }catch(e){
    return structuredClone(defaultState)
  }
}

function saveState(state){
  localStorage.setItem(KEY, JSON.stringify(state))
}

// simple helpers to keep UI as before
export function getAllLocal(st){ return loadState()[st] || [] }

export function upsertStaffLocal(staff){
  const state = loadState()
  const idx = state.staff.findIndex(s=>s.id===staff.id)
  if(idx>=0) state.staff[idx]=staff
  else state.staff.push(staff)
  saveState(state)
}

// Attendance local
export function addAttendanceLocal(record){
  const state = loadState()
  state.attendance.push(record)
  saveState(state)
}

// Payments
export function addPaymentLocal(p){ const state=loadState(); state.payments.push(p); saveState(state) }

// Complaints
export function addComplaintLocal(c){ const state=loadState(); state.complaints.push(c); saveState(state) }

export function addUploadLocal(u){ const state=loadState(); state.uploads.push(u); saveState(state) }

// Supabase sync (best-effort, non-blocking)
import { hasSupabase, supabase } from '../supabase'

async function safeUpsertStaffSupabase(staff){
  if(!hasSupabase) return
  try{
    await supabase.from('staff').upsert(staff).select()
  }catch(e){ console.error('Supabase staff upsert error', e) }
}

async function safeAddAttendanceSupabase(record){
  if(!hasSupabase) return
  try{
    await supabase.from('attendance').insert(record).select()
  }catch(e){ console.error('Supabase attendance insert error', e) }
}

async function safeAddPaymentSupabase(p){
  if(!hasSupabase) return
  try{ await supabase.from('payments').insert(p).select() }catch(e){ console.error('Supabase payment insert error', e) }
}

async function safeAddComplaintSupabase(c){
  if(!hasSupabase) return
  try{ await supabase.from('complaints').insert(c).select() }catch(e){ console.error('Supabase complaint insert error', e) }
}

async function safeAddUploadSupabase(u){
  if(!hasSupabase) return
  try{ await supabase.from('uploads').insert(u).select() }catch(e){ console.error('Supabase upload insert error', e) }
}

// Export functions used by UI but these keep local sync first and then attempt server sync
export function upsertStaff(staff){
  upsertStaffLocal(staff)
  // fire-and-forget sync
  safeUpsertStaffSupabase(staff)
}

export function addAttendance(record){
  addAttendanceLocal(record)
  safeAddAttendanceSupabase(record)
}

export function addPayment(p){
  addPaymentLocal(p)
  safeAddPaymentSupabase(p)
}

export function addComplaint(c){
  addComplaintLocal(c)
  safeAddComplaintSupabase(c)
}

export function addUpload(u){
  addUploadLocal(u)
  safeAddUploadSupabase(u)
}

// Readers still point to localStorage for immediate UI; you can later add fetch-from-supabase views
export function getAll(st){ return loadState()[st] || [] }
// GET COMPLAINTS – required by Complaints.jsx
export function getComplaints(){
  return loadState().complaints || []
}
// Initialize default demo data if localStorage empty
export function initDemoData() {
  const raw = localStorage.getItem('staff_diary_db_v1')
  if (!raw) {
    localStorage.setItem('staff_diary_db_v1', JSON.stringify({
      staff: [],
      attendance: [],
      payments: [],
      complaints: [],
      uploads: []
    }))
  }
}
