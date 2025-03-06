import React from "react";
import { TFeedback } from "@/types/question.type";
import { format } from "date-fns";

const ActivityCard = ({ feedback }: { feedback: TFeedback }) => {
  return (
    <div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <h6 className="text-base font-semibold capitalize">
            {feedback?.f_name}
          </h6>
          <p className="text-sm font-medium opacity-60 -mt-1">
            {feedback?.f_role}
          </p>
        </div>
        <div className="text-sm font-semibold">
          {format(feedback?.f_date, "dd MMM yyyy")}
        </div>
      </div>
      <p className="mt-2">{feedback?.f_text}</p>
    </div>
  );
};

export default ActivityCard;
