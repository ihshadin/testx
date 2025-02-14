"use client";
import React, { useState } from "react";
import { useGetAllQuestionQuery } from "@/redux/features/question/questionApi";
import AssignQuestions from "@/components/Questions/AssignQuestions";
import CustomPagination from "@/utils/Pagination";

const QuestionReassignmentPage = () => {
  const [searchTeacher, setSearchTeacher] = useState("");
  const [params, setParams] = useState<any>([
    { name: "status", value: "assigned" },
  ]);
  const { data, isLoading: isQuesLoading } = useGetAllQuestionQuery(params);

  const handleTeacherSearch = () => {
    setParams([
      { name: "status", value: "assigned" },
      { name: "teacher", value: searchTeacher },
    ]);
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto py-8 px-2">
        <div className="">
          <AssignQuestions
            questions={data?.data}
            isQuesLoading={isQuesLoading}
            handleTeacherSearch={handleTeacherSearch}
            setSearchTeacher={setSearchTeacher}
          />
          {data?.meta?.totalPage > 1 && (
            <div className="mt-8 lg:mt-12">
              <CustomPagination meta={data?.meta} setParams={setParams} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuestionReassignmentPage;
