import { createClient } from '@supabase/supabase-js';

// Get environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Boolean to check if Supabase is configured
export const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_ANON);

// Create client only if keys exist
export const supabase = hasSupabase
  ? createClient(SUPABASE_URL, SUPABASE_ANON)
  : null;

// Default export (for components that use default import)
export default supabase;

// ---- Utility functions below ----

// Create attendance request
export async function createAttendanceRequest(payload) {
  if (!hasSupabase) return null;

  const { data, error } = await supabase
    .from('attendance_requests')
    .insert([
      {
        ...payload,
        status: 'pending',
        created_at: new Date().toISOString(),
      },
    ]);

  if (error) console.error('Attendance request error:', error);
  return data;
}

// Get current local user
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem('current_staff');
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}
