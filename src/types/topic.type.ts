import { Types } from "mongoose";

export type TTopic = {
  _id?: string; // PK
  name: string;
  subjects: Types.ObjectId[]; //FK
  description?: string;
};
