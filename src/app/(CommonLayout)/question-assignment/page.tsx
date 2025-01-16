"use client";
import React, { useState } from "react";
import { Col, Form, Input, Row, Select } from "antd";
import UnassignQuestions from "@/components/Questions/UnassignQuestions";
import QuesAssignFilter from "@/components/Questions/QuesAssignFilter";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
import { useGetAllSubjectQuery } from "@/redux/features/subject/subjectApi";

const QuestionAssignmentPage = () => {
  // const [subjects, setSubjects] = useState([]);
  const { data: courses, isLoading: isCourseLoading } =
    useGetAllCourseQuery(undefined);
  const { data: subjects, isLoading: isSubjectLoading } =
    useGetAllSubjectQuery(undefined);

  // console.log("Course", courses?.data);
  const [topics, setTopics] = useState([]);
  const [isSubDisabled, setIsSubDisabled] = useState(true);
  const [isTopDisabled, setIsTopDisabled] = useState(true);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [form] = Form.useForm();
  // TODO: type problem

  const topicsData: any = [
    { _id: "1", label: "Cardiovascular", subjectId: "3" },
    { _id: "2", label: "Musculoskeletal", subjectId: "3" },
    { _id: "3", label: "Cellular Functions", subjectId: "1" },
    { _id: "4", label: "Nervous System", subjectId: "4" },
    { _id: "5", label: "Probability", subjectId: "4" },
    { _id: "6", label: "Geometry", subjectId: "1" },
    { _id: "7", label: "Grammar", subjectId: "1" },
    { _id: "8", label: "Vocabulary", subjectId: "2" },
    { _id: "9", label: "Physics", subjectId: "5" },
    { _id: "10", label: "Chemistry", subjectId: "2" },
    { _id: "11", label: "World War II", subjectId: "5" },
    { _id: "12", label: "Industrial Revolution", subjectId: "6" },
  ];

  const handleCourseChange = (courseId: string) => {
    form.resetFields(["subjects", "topics"]);
    // setTopics([]);
    setIsSubDisabled(false);
    setIsTopDisabled(true);
    setIsBtnDisabled(true);
  };

  const handleSubjectChange = (subjectId: string) => {
    form.resetFields(["topics"]);
    setTopics(topicsData.filter((topic: any) => topic.subjectId === subjectId));
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
            topics={topics}
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
