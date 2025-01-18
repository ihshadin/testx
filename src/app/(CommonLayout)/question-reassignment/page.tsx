"use client";
import React, { useState } from "react";
import { useGetAllQuestionQuery } from "@/redux/features/question/questionApi";
import AssignQuestions from "@/components/Questions/AssignQuestions";

const QuestionReassignmentPage = () => {
  const [searchTeacher, setSearchTeacher] = useState([]);
  const [params, setParams] = useState<any>([
    { name: "status", value: "assigned" },
  ]);
  const { data: questions, isLoading: isQuesLoading } =
    useGetAllQuestionQuery(params);

  const handleTeacher = () => {
    setParams((prevParams: any) => {
      const updatedParams =
        searchTeacher.length > 0
          ? [
              ...prevParams.filter((param: any) => param.name !== "teachers"),
              { name: "teachers", value: JSON.stringify(searchTeacher) },
            ]
          : [{ name: "status", value: "assigned" }];
      return updatedParams;
    });
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto py-8 px-2">
        <div className="">
          <AssignQuestions
            questions={questions?.data}
            isQuesLoading={isQuesLoading}
            handleTeacher={handleTeacher}
            setSearchTeacher={setSearchTeacher}
          />
        </div>
      </div>
    </section>
  );
};

export default QuestionReassignmentPage;
