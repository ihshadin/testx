"use client";
import React, { useState } from "react";
import UnassignQuestions from "@/components/Questions/UnassignQuestions";
import { useGetAllQuestionQuery } from "@/redux/features/question/questionApi";
import FilterByCourse from "@/components/Questions/FilterByCourse";
import CustomPagination from "@/utils/Pagination";

const QuestionAssignmentPage = () => {
  const [params, setParams] = useState<any>([
    { name: "status", value: "unassigned" },
  ]);

  const { data: questions, isLoading: isQuesLoading } =
    useGetAllQuestionQuery(params);

  const handleFilter = (data: Record<string, unknown>) => {
    setParams([
      ...params.filter((param: any) => param?.name === "status"),
      ...Object.entries(data)
        .filter(([, value]) => value)
        .map(([key, value]) => ({ name: key, value })),
    ]);
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto py-8 px-2">
        <div className="flex flex-col gap-5">
          <FilterByCourse handleFilter={handleFilter} />
          <UnassignQuestions
            questions={questions}
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

export default QuestionAssignmentPage;
