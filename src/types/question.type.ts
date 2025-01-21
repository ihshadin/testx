import { QUESTION_STATUS } from "@/app/api/v1/question/questionModule/question.constant";
import { Types } from "mongoose";
import { Dispatch } from "react";

export type TQuestion = {
  _id?: string; // PK
  title: string;
  desc: string;
  newDesc?: string;
  domain?: string;
  difficulty_level: "easy" | "medium" | "hard";
  course: Types.ObjectId; //FK
  subject: Types.ObjectId; //FK
  topic: Types.ObjectId; //FK
  teacher?: Types.ObjectId; //FK
  owner?: Types.ObjectId; //FK
  comment?: string;
  images?: {
    id: string;
    url: string;
  };
  status: keyof typeof QUESTION_STATUS;
};

export type TQuestions = {
  questions: TQuestion[];
  isQuesLoading: boolean;
  handleTeacherSearch: any;
  setSearchTeacher: Dispatch<React.SetStateAction<string>>;
};
