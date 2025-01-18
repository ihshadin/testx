import { Types } from "mongoose";
import { Dispatch } from "react";

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

export type TQuestions = {
  questions: TQuestion[];
  isQuesLoading: boolean;
  handleTeacher: any;
  setSearchTeacher: Dispatch<React.SetStateAction<never[]>>;
};
