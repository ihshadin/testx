import { QUESTION_STATUS } from "@/app/api/v1/question/questionModule/question.constant";
import { Types } from "mongoose";
import { Dispatch } from "react";

export type TQuestion = {
  _id?: string; // PK
  question_id?: number;
  title: string;
  desc?: string;
  newDesc?: string;
  domain?: string;
  difficulty_level: "easy" | "medium" | "hard";
  courses: Types.ObjectId[]; //FK
  subjects: Types.ObjectId[]; //FK
  topics: Types.ObjectId[]; //FK
  options?: string[];
  teachers?: string[];
  owner?: string; //FK
  status: keyof typeof QUESTION_STATUS;
};

export type TQuestions = {
  questions: TQuestion[];
  isQuesLoading: boolean;
  handleTeacher: any;
  setSearchTeacher: Dispatch<React.SetStateAction<never[]>>;
};
