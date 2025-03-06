"use client";
import React, { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { useUpdateQuestionFeedbackMutation } from "@/redux/features/question/questionApi";
import { useAppSelector } from "@/redux/hooks";
import { useSelectCurrentUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { useParams } from "next/navigation";

const FeedbackBox = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState("");
  const user = useAppSelector(useSelectCurrentUser);
  const [updateQuestion] = useUpdateQuestionFeedbackMutation();

  const handleAddFeedback = async () => {
    const toastId = toast.loading("Adding notice...");

    const newFeedback = {
      f_name: user?.role,
      f_role: user?.email,
      f_date: new Date().toISOString(),
      f_text: feedback,
    };

    const updatedData = {
      id: id,
      data: {
        feedbacks: newFeedback, // Pass the object directly here
      },
    };

    try {
      const res = await updateQuestion(updatedData).unwrap();
      if (res?.success) {
        toast.success("Successfully added the Feedback", { id: toastId });
        setFeedback("");
      } else {
        toast.error("Something want wrong!", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <div>
      Write your feedback below
      <div className="flex flex-col gap-2 items-end">
        <TextArea
          rows={5}
          className="border border-[#C4CAD4] !rounded-lg"
          placeholder="Write here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button
          onClick={handleAddFeedback}
          className="cursor-pointer disabled:cursor-not-allowed px-4 py-1.5 bg-primary hover:bg-gray-950 disabled:bg-primary disabled:opacity-50 font-medium  text-white rounded-lg"
          type="submit"
          disabled={!feedback}
        >
          Add Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackBox;
