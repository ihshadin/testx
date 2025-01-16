export const USER_ROLE = {
  superAdmin: "superAdmin",
  admin: "admin",
  teacher: "teacher",
  coordinator: "coordinator",
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
