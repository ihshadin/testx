"use client";
import React, { useState } from "react";
import { Col, Form, Input, Row, Select } from "antd";
import UnassignQuestions from "@/components/Questions/UnassignQuestions";
import QuesAssignFilter from "@/components/Questions/QuesAssignFilter";
import { useGetAllUnassignQuestionQuery } from "@/redux/features/question/questionApi";

const QuestionAssignmentPage = () => {
  const { data: questions, isLoading: isQuesLoading } =
    useGetAllUnassignQuestionQuery(undefined);

  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto py-8 px-2">
        <div>
          <QuesAssignFilter onSubmit={onSubmit} />
        </div>
        <div className="mt-10">
          <UnassignQuestions
            questions={questions?.data}
            isQuesLoading={isQuesLoading}
          />
        </div>
      </div>
    </section>
  );
};

export default QuestionAssignmentPage;
