import { Types } from "mongoose";

export type TSubject = {
  _id?: string; // PK
  name: string;
  course: Types.ObjectId; //FK
  description?: string;
};
