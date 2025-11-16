import { createClient } from '@supabase/supabase-js';

// Environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// Default export (IMPORTANT for Vite/Netlify build)
export default supabase;

// Named export (optional)
export { supabase };

// Create an attendance request
export async function createAttendanceRequest(payload) {
  const { staff_id, staff_name, staff_code, request_type, time } = payload;

  const { data, error } = await supabase
    .from('attendance_requests')
    .insert([
      {
        staff_id,
        staff_name,
        staff_code,
        request_type,
        time,
        status: 'pending',
        created_at: new Date().toISOString(),
      },
    ]);

  if (error) {
    console.error('Attendance request error:', error);
  }

  return data;
}

// Get current user (local simulation)
export function getCurrentUser() {
  try {
    const u = localStorage.getItem('current_staff');
    return u ? JSON.parse(u) : null;
  } catch (err) {
    return null;
  }
}
