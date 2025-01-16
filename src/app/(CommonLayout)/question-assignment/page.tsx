"use client";
import React, { useState } from "react";
import { Col, Form, Input, Row, Select } from "antd";
import UnassignQuestions from "@/components/Questions/UnassignQuestions";
import QuesAssignFilter from "@/components/Questions/QuesAssignFilter";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
import { useGetAllSubjectQuery } from "@/redux/features/subject/subjectApi";
import { useGetAllTopicQuery } from "@/redux/features/topic/topicApi";

const QuestionAssignmentPage = () => {
  const { data: courses, isLoading: isCourseLoading } =
    useGetAllCourseQuery(undefined);
  const { data: subjects, isLoading: isSubjectLoading } =
    useGetAllSubjectQuery(undefined);
  const { data: topics, isLoading: isTopicLoading } =
    useGetAllTopicQuery(undefined);

  const [isSubDisabled, setIsSubDisabled] = useState(true);
  const [isTopDisabled, setIsTopDisabled] = useState(true);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [form] = Form.useForm();

  const handleCourseChange = (courseId: string) => {
    form.resetFields(["subjects", "topics"]);
    setIsSubDisabled(false);
    setIsTopDisabled(true);
    setIsBtnDisabled(true);
  };

  const handleSubjectChange = (subjectId: string) => {
    form.resetFields(["topics"]);
    setIsTopDisabled(false);
    setIsBtnDisabled(true);
  };

  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto py-8 px-2">
        <div>
          <QuesAssignFilter
            onSubmit={onSubmit}
            courses={courses?.data}
            subjects={subjects?.data}
            topics={topics?.data}
            handleCourseChange={handleCourseChange}
            handleSubjectChange={handleSubjectChange}
            isSubDisabled={isSubDisabled}
            isTopDisabled={isTopDisabled}
            isBtnDisabled={isBtnDisabled}
            setIsBtnDisabled={setIsBtnDisabled}
          />
        </div>
        <div className="mt-10">
          <UnassignQuestions />
        </div>
      </div>
    </section>
  );
};

export default QuestionAssignmentPage;
