import { QUESTION_STATUS } from "@/app/api/v1/question/questionModule/question.constant";
import { Dispatch } from "react";

export type TQuestion = {
  _id?: string; // PK
  title: string;
  desc: string;
  newDesc?: string;
  domain?: string;
  difficulty_level: "easy" | "medium" | "hard";
  course: string; //FK
  subject: string; //FK
  topic: string; //FK
  teacher?: string; //FK
  owner?: string; //FK
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
  handleTeacher: any;
  setSearchTeacher: Dispatch<React.SetStateAction<never[]>>;
};
