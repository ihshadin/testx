import { Types } from "mongoose";

export type TSubject = {
  _id?: string; // PK
  name: string;
  courses: Types.ObjectId[]; //FK
  description?: string;
};
