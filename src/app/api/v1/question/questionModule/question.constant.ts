export const QUESTION_STATUS = {
  unassigned: "unassigned",
  assigned: "assigned",
  reassigned: "reassigned",
  hold: "hold",
  verified: "verified",
  approved: "approved",
  completed: "completed",
} as const;

export const questionSearchableFields = ["title", "desc"];
