import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY

export const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_ANON)

export const supabase = hasSupabase ? createClient(SUPABASE_URL, SUPABASE_ANON) : null


// Create an attendance request (checkin/checkout)
export async function createAttendanceRequest(payload) {
  // payload: { staff_id, staff_name, staff_code, request_type: 'checkin'|'checkout', requested_time, note }
  const { data, error } = await supabase.from('attendance_requests').insert([payload]);
  return { data, error };
}


export async function getCurrentUser() {
  // This is a simple example: in real app use auth session
  // For quick local testing, the app reads localStorage.current_staff
  try {
    const v = JSON.parse(localStorage.getItem('current_staff') || 'null');
    return v;
  } catch(e){
    return null;
  }
}
