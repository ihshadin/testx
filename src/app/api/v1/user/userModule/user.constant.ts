export const USER_ROLE = {
  superAdmin: "superAdmin",
  admin: "admin",
  teacher: "teacher",
  coordinator: "coordinator",
} as const;
export const USER_STATUS = {
  pending: "pending",
  approved: "approved",
  reject: "reject",
} as const;

// Exclude 'superAdmin' and 'admin'
export const Filtered_Roles = Object.values(USER_ROLE).filter(
  (role) => role !== "superAdmin" // && role !== 'admin'
) as [string, ...string[]];

export const UserSearchableFields = [
  "first_name",
  "last_name",
  "email",
  "contact_no",
];
