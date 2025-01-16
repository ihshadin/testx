export const USER_ROLE = {
  superAdmin: "superAdmin",
  admin: "admin",
} as const;

// Exclude 'superAdmin' and 'admin'
export const Filtered_Roles = Object.values(USER_ROLE).filter(
  (role) => role !== "superAdmin" // && role !== 'admin'
) as [string, ...string[]];

export const UserSearchableFields = [
  "firstName",
  "lastName",
  "email",
  "number",
];
