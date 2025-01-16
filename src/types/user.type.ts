import { USER_ROLE } from "../app/api/v1/user/userModule/user.constant";

export type TUser = {
  _id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  contact_no: string;
  role: keyof typeof USER_ROLE;
  user_subject: string;
  photo?: string;
  isDeleted: boolean;
};
