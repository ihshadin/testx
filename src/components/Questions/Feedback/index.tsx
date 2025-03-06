import React from "react";
import FeedbackBox from "./FeedbackBox";
import ActivityCard from "./ActivityCard";
import { TQuestion } from "@/types/question.type";

const FeedbackContainer = ({ question }: { question: TQuestion }) => {
  return (
    <div className="my-5 border border-primary/10 rounded-lg flex">
      <div className="border-r border-primary/10 md:w-[65%] px-4 py-3 [&_>_*:not(:last-child)]:border-b-2 [&_>_*:not(:last-child)]:mb-3 [&_>_*:not(:last-child)]:pb-3">
        {question?.feedbacks?.map((feedback) => (
          <ActivityCard feedback={feedback} />
        ))}
      </div>
      <div className="grow px-4 py-3">
        <FeedbackBox />
      </div>
    </div>
  );
};

export default FeedbackContainer;
