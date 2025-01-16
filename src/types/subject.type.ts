import { Types } from "mongoose";

export type TSubject = {
  _id?: string;
  name: string;
  course: Types.ObjectId;
};
