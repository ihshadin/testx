"use client";
import React, { useState } from "react";
import { useGetAllQuestionQuery } from "@/redux/features/question/questionApi";
import HoldQuestions from "@/components/Questions/HoldQuestions";

const HoldQuestionPage = () => {
  const [params, setParams] = useState<any>([
    { name: "status", value: "hold" },
  ]);

  const { data: questions, isLoading: isQuesLoading } =
    useGetAllQuestionQuery(params);

  return (
    <section>
      <div className="max-w-7xl mx-auto py-8 px-2">
        <div className="">
          <HoldQuestions
            questions={questions?.data}
            isQuesLoading={isQuesLoading}
          />
        </div>
      </div>
    </section>
  );
};

export default HoldQuestionPage;
