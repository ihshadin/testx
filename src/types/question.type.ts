import { Types } from "mongoose";

export type TQuestion = {
  _id?: string; // PK
  question_id: number;
  title: string;
  desc?: string;
  domain?: string;
  difficulty_level: "easy" | "medium" | "hard";
  courses: Types.ObjectId[]; //FK
  subjects: Types.ObjectId[]; //FK
  topics: Types.ObjectId[]; //FK
  options: string[];
  teachers?: string[];
  status: "assigned" | "unassigned" | "reassigned";
};
