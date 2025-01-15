import { USER_ROLE } from "../app/api/v1/user/userModule/user.constant";

export type TUser = {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  photo?: string;
  role: keyof typeof USER_ROLE;
  isDeleted: boolean;
};
