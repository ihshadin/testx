import { TCourse } from "@/types/course.type";
import { model, models, Schema } from "mongoose";

const CourseSchema: Schema = new Schema<TCourse>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CourseModel =
  models.Course || model<TCourse>("Course", CourseSchema);
