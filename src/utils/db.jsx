// ===============================
// DATABASE UTILITIES (LOCAL + SUPABASE SYNC)
// ===============================

// Supabase config
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
let hasSupabase = !!(supabaseUrl && supabaseKey);

// Initialize Supabase client only if keys exist
let supabase = null;
if (hasSupabase) {
  supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
}

// ===============================
// LOCAL STORAGE HELPERS
// ===============================
function readLocal(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function writeLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ===============================
// STAFF FUNCTIONS
// ===============================

// ⭐ REQUIRED BY StaffList.jsx — THIS FIXES NETLIFY BUILD ERROR
export function getAllStaff() {
  try {
    return readLocal("staff");
  } catch (e) {
    console.error("Error reading staff list:", e);
    return [];
  }
}

// Add or Update Staff Locally
export function upsertStaffLocal(staff) {
  let all = readLocal("staff");
  const idx = all.findIndex((s) => s.id === staff.id);

  if (idx >= 0) all[idx] = staff;
  else all.push(staff);

  writeLocal("staff", all);
}

// Sync Staff to Supabase
async function safeUpsertStaffSupabase(staff) {
  if (!hasSupabase) return;

  try {
    await supabase.from("staff").upsert(staff).select();
  } catch (e) {
    console.error("Supabase staff upsert error:", e);
  }
}

// Exported Function (used in Add/Edit Staff)
export function upsertStaff(staff) {
  upsertStaffLocal(staff);
  safeUpsertStaffSupabase(staff); // async fire-and-forget sync
}

// ===============================
// ATTENDANCE FUNCTIONS
// ===============================
export function addAttendanceLocal(record) {
  let all = readLocal("attendance");
  all.push(record);
  writeLocal("attendance", all);
}

async function safeAddAttendanceSupabase(record) {
  if (!hasSupabase) return;
  try {
    await supabase.from("attendance").insert(record).select();
  } catch (e) {
    console.error("Supabase attendance insert error:", e);
  }
}

export function addAttendance(record) {
  addAttendanceLocal(record);
  safeAddAttendanceSupabase(record);
}

// ===============================
// PAYMENT FUNCTIONS
// ===============================
export function addPaymentLocal(p) {
  let all = readLocal("payments");
  all.push(p);
  writeLocal("payments", all);
}

async function safeAddPaymentSupabase(p) {
  if (!hasSupabase) return;
  try {
    await supabase.from("payments").insert(p).select();
  } catch (e) {
    console.error("Supabase payment insert error:", e);
  }
}

export function addPayment(p) {
  addPaymentLocal(p);
  safeAddPaymentSupabase(p);
}

// ===============================
// COMPLAINT FUNCTIONS
// ===============================
export function addComplaintLocal(c) {
  let all = readLocal("complaints");
  all.push(c);
  writeLocal("complaints", all);
}

async function safeAddComplaintSupabase(c) {
  if (!hasSupabase) return;
  try {
    await supabase.from("complaints").insert(c).select();
  } catch (e) {
    console.error("Supabase complaint insert error:", e);
  }
}

export function addComplaint(c) {
  addComplaintLocal(c);
  safeAddComplaintSupabase(c);
}

// ===============================
// UPLOAD FUNCTIONS
// ===============================
export function addUploadLocal(u) {
  let all = readLocal("uploads");
  all.push(u);
  writeLocal("uploads", all);
}

async function safeAddUploadSupabase(u) {
  if (!hasSupabase) return;
  try {
    await supabase.from("uploads").insert(u).select();
  } catch (e) {
    console.error("Supabase upload insert error:", e);
  }
}

export function addUpload(u) {
  addUploadLocal(u);
  safeAddUploadSupabase(u);
}

// ===============================
// INIT DEMO DATA (FIRST RUN ONLY)
// ===============================
export function initDemoData() {
  if (!localStorage.getItem("staff")) {
    writeLocal("staff", []);
  }
  if (!localStorage.getItem("attendance")) {
    writeLocal("attendance", []);
  }
  if (!localStorage.getItem("payments")) {
    writeLocal("payments", []);
  }
  if (!localStorage.getItem("complaints")) {
    writeLocal("complaints", []);
  }
  if (!localStorage.getItem("uploads")) {
    writeLocal("uploads", []);
  }
}
