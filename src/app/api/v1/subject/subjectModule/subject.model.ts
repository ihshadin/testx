import { TSubject } from "@/types/subject.type";
import { model, models, Schema } from "mongoose";

const SubjectSchema: Schema = new Schema<TSubject>(
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

    courses: {
      type: [{ type: Schema.Types.ObjectId, ref: "Course" }],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SubjectModel =
  models.Subject || model<TSubject>("Subject", SubjectSchema);
