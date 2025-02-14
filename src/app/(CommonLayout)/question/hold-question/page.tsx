"use client";
import React, { useState } from "react";
import { useGetAllQuestionQuery } from "@/redux/features/question/questionApi";
import HoldQuestions from "@/components/Questions/HoldQuestions";
import CustomPagination from "@/utils/Pagination";

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
          {questions?.meta?.totalPage > 1 && (
            <div className="mt-8 lg:mt-12">
              <CustomPagination meta={questions?.meta} setParams={setParams} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HoldQuestionPage;
