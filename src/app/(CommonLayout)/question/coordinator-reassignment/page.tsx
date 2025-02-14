"use client";
import React, { useState } from "react";
import { useGetQuestionsQuery } from "@/redux/features/question/coordinator";
import CoordinatorReassigned from "@/components/Questions/CoordinatorReassigned";
import CustomPagination from "@/utils/Pagination";

const CoordinatorQuestionReassignment = () => {
  const [searchTeacher, setSearchTeacher] = useState("");
  const [params, setParams] = useState<any>([
    { name: "status", value: "assigned" },
  ]);
  const { data: questions, isLoading: isQuesLoading } =
    useGetQuestionsQuery(params);

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
          <CoordinatorReassigned
            questions={questions?.data}
            isQuesLoading={isQuesLoading}
            handleTeacherSearch={handleTeacherSearch}
            setSearchTeacher={setSearchTeacher}
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

export default CoordinatorQuestionReassignment;
