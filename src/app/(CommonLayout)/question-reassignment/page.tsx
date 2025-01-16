"use client";
import React, { useState } from "react";
import { Col, Form, Input, Row, Select } from "antd";
import UnassignQuestions from "@/components/Questions/UnassignQuestions";

const QuestionReassignmentPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isSubDisabled, setIsSubDisabled] = useState(true);
  const [isTopDisabled, setIsTopDisabled] = useState(true);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [form] = Form.useForm();
  // TODO: type problem
  // Static data with `_id` for demonstration purposes
  const courses = [
    { _id: "1", label: "USMLE" },
    { _id: "2", label: "SAT" },
    { _id: "3", label: "ACT" },
  ];

  const subjectsData: any = [
    { _id: "1", label: "Anatomy", courseId: "2" },
    { _id: "2", label: "Physiology", courseId: "1" },
    { _id: "3", label: "Math", courseId: "1" },
    { _id: "4", label: "English", courseId: "2" },
    { _id: "5", label: "Science", courseId: "1" },
    { _id: "6", label: "History", courseId: "3" },
  ];

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

  const mapToOptions = (data: any) =>
    data.map(({ _id, label }: any) => ({ value: _id, label }));

  const handleCourseChange = (courseId: string) => {
    form.resetFields(["subjects", "topics"]);
    setSubjects(
      subjectsData.filter((subject: any) => subject.courseId === courseId)
    );
    setTopics([]);
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
        <Form
          form={form}
          onFinish={onSubmit}
          requiredMark={false}
          layout="vertical"
        >
          <Row gutter={15} align="bottom">
            <Col span={8}>
              <Form.Item
                label="Courses"
                name="courses"
                // rules={[{ required: true, message: "Courses is required" }]}
                style={{ marginBottom: 0 }}
              >
                <Select
                  showSearch
                  placeholder="Select from here..."
                  options={mapToOptions(courses)}
                  className="!h-10 !bg-transparent *:!rounded-lg "
                  onChange={handleCourseChange}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label="Subjects"
                name="subjects"
                // rules={[{ required: true, message: "Subjects is required" }]}
                style={{ marginBottom: 0 }}
              >
                <Select
                  showSearch
                  placeholder="Select from here..."
                  options={mapToOptions(subjects)}
                  className="!h-10 !bg-transparent *:!rounded-lg "
                  onChange={handleSubjectChange}
                  disabled={isSubDisabled}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Topics"
                name="topics"
                rules={[{ required: true, message: "Topics is required" }]}
                style={{ marginBottom: 0 }}
              >
                <Select
                  showSearch
                  placeholder="Select from here..."
                  options={mapToOptions(topics)}
                  className="!h-10 !bg-transparent *:!rounded-lg "
                  onChange={() => setIsBtnDisabled(false)}
                  disabled={isTopDisabled}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <div>
                <button
                  className="cursor-pointer disabled:cursor-not-allowed text-base font-medium block w-full bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
                  type="submit"
                  disabled={isBtnDisabled}
                >
                  Search
                </button>
              </div>
            </Col>
          </Row>
        </Form>
        <div className="mt-10">
          <UnassignQuestions />
        </div>
      </div>
    </section>
  );
};

export default QuestionReassignmentPage;
