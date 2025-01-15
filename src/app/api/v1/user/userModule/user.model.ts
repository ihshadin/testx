import { Schema, model, models } from "mongoose";
import { USER_ROLE } from "./user.constant";
import { TUser } from "../../../../../types/user.type";

const userSchema = new Schema<TUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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
    photo: {
      type: String,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      required: true,
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
