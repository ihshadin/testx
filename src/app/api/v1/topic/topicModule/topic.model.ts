import { TTopic } from "@/types/topic.type";
import { model, models, Schema } from "mongoose";

const TopicSchema: Schema = new Schema<TTopic>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    subjects: {
      type: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TopicModel = models.Topic || model<TTopic>("Topic", TopicSchema);
