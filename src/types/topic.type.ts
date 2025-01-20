import { Types } from "mongoose";

export type TTopic = {
  _id?: string; // PK
  name: string;
  description?: string;
  subject: Types.ObjectId; //FK
};
