
export const roles = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff'
};

// Permissions map (can be extended)
export const permissions = {
  viewAllStaff: [roles.SUPERADMIN, roles.ADMIN, roles.MANAGER],
  manageAdmins: [roles.SUPERADMIN],
  approveAttendance: [roles.SUPERADMIN, roles.ADMIN, roles.MANAGER],
  manageSalary: [roles.SUPERADMIN, roles.ADMIN],
  viewOwnData: [roles.SUPERADMIN, roles.ADMIN, roles.MANAGER, roles.STAFF]
};

export function can(role, perm){
  if(!role) return false;
  const allowed = permissions[perm] || [];
  return allowed.includes(role);
}
