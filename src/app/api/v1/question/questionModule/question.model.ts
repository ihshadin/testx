import { TQuestion } from "@/types/question.type";
import { model, models, Schema } from "mongoose";

const QuestionSchema: Schema = new Schema<TQuestion>(
  {
    question_id: {
      type: Number,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    domain: {
      type: String,
      trim: true,
    },
    difficulty_level: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    courses: {
      type: [{ type: Schema.Types.ObjectId, ref: "Course" }],
      required: true,
    },
    subjects: {
      type: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
      required: true,
    },
    topics: {
      type: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
      required: true,
    },
    options: {
      type: [String],
    },
    teachers: {
      type: [String],
    },
    status: {
      type: String,
      enum: ["assigned", "unassigned", "reassigned"],
      default: "unassigned",
    },
  },
  {
    timestamps: true,
  }
);

export const QuestionModel =
  models.Question || model<TQuestion>("Question", QuestionSchema);
