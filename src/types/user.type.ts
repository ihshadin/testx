import { Types } from "mongoose";
import { USER_ROLE } from "../app/api/v1/user/userModule/user.constant";

export type TUser = {
  _id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  contact_no: string;
  role: keyof typeof USER_ROLE;
  courses: Types.ObjectId[]; //FK
  subjects: Types.ObjectId[]; //FK
  photo?: string;
  isDeleted: boolean;
};
