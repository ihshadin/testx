import { Schema, model, models } from "mongoose";
import { USER_ROLE } from "./user.constant";
import { TUser } from "../../../../../types/user.type";

const userSchema = new Schema<TUser>(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact_no: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      required: true,
    },
    user_subject: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = models.User || model<TUser>("User", userSchema);
