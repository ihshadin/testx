import { Schema, model, models } from "mongoose";
import { USER_ROLE, USER_STATUS } from "./user.constant";
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
    status: {
      type: String,
      enum: Object.values(USER_STATUS),
      required: true,
      default: "pending",
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    photo: {
      type: String,
    },
    coordinator: {
      type: String,
      default: "null",
    },
    teachers: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      // default: [],
    },
    resetCode: { type: Number, default: null },
    resetCodeExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export const UserModel = models.User || model<TUser>("User", userSchema);
