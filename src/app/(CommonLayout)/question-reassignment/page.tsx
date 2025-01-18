"use client";
import React, { useState } from "react";
import { Col, Form, Input, Row, Select } from "antd";
import UnassignQuestions from "@/components/Questions/UnassignQuestions";
import { useGetAllQuestionQuery } from "@/redux/features/question/questionApi";
import AssignQuestions from "@/components/Questions/AssignQuestions";

const QuestionReassignmentPage = () => {
  const [searchTeacher, setSearchTeacher] = useState("");
  const [params, setParams] = useState<any>([
    { name: "status", value: "assigned" },
  ]);
  const { data: questions, isLoading: isQuesLoading } =
    useGetAllQuestionQuery(params);

  console.log(searchTeacher);
  const handleTeacher = () => {
    if (searchTeacher) {
      setParams((prevParams: any) => [
        ...prevParams,
        { name: "teacher", value: searchTeacher },
      ]);
    }
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
