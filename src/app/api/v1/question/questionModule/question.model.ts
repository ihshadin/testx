import { TQuestion } from "@/types/question.type";
import { model, models, Schema } from "mongoose";
import { QUESTION_STATUS } from "./question.constant";

const QuestionSchema: Schema = new Schema<TQuestion>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
    },
    newDesc: {
      type: String,
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
    topic: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      trim: true,
    },
    images: {
      id: { type: String },
      url: { type: String },
    },
    status: {
      type: String,
      enum: Object.values(QUESTION_STATUS),
      default: "unassigned",
    },
  },
  {
    timestamps: true,
  }
);

export const QuestionModel =
  models.Question || model<TQuestion>("Question", QuestionSchema);
