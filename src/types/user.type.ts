import { Types } from "mongoose";
import {
  USER_ROLE,
  USER_STATUS,
} from "../app/api/v1/user/userModule/user.constant";

export type TUser = {
  _id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  contact_no: string;
  role: keyof typeof USER_ROLE;
  status: keyof typeof USER_STATUS;
  course: Types.ObjectId; //FK
  subject: Types.ObjectId; //FK
  photo?: string;
  isDeleted: boolean;
};
