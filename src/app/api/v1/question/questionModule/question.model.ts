import { TFeedback } from "@/types/question.type";
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
      required: true,
      ref: "Course",
    },
    subject: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Subject",
    },
    topic: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Topic",
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
    images: [String],
    status: {
      type: String,
      enum: Object.values(QUESTION_STATUS),
      default: "unassigned",
    },
    feedbacks: [
      {
        f_name: { type: String, required: true },
        f_role: { type: String, required: true },
        f_date: { type: String, required: true },
        f_text: { type: String, required: true },
      },
    ],
    qId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const QuestionModel =
  models.Question || model<TQuestion>("Question", QuestionSchema);
