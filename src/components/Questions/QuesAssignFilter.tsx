import React, { useState } from "react";

import { Col, Form, Row, Select } from "antd";
import { TCourse } from "@/types/course.type";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
import { useGetAllSubjectQuery } from "@/redux/features/subject/subjectApi";
import { useGetAllTopicQuery } from "@/redux/features/topic/topicApi";
import { convertParams, mapToOptions } from "@/utils";

const QuesAssignFilter = ({ onSubmit }: any) => {
  const [selCourses, setSelCourses] = useState<string[]>([]);
  const [selSubjects, setSelSubjects] = useState<string[]>([]);
  const [selTopics, setSelTopics] = useState<string[]>([]);
  const [form] = Form.useForm();

  const { data: courses, isLoading: isCouLoading } =
    useGetAllCourseQuery(undefined);
  const { data: subjects, isLoading: isSubLoading } = useGetAllSubjectQuery(
    convertParams("courses", selCourses)
  );
  const { data: topics, isLoading: isToLoading } = useGetAllTopicQuery(
    convertParams("subjects", selSubjects)
  );

  const handleCourseChange = (courseIds: string[]) => {
    form.setFieldsValue({ subjects: [], topics: [] });
    setSelCourses(courseIds);
    setSelSubjects([]);
    setSelTopics([]);
  };

  const handleSubjectChange = (courseIds: string[]) => {
    form.setFieldsValue({ topics: [] });
    setSelSubjects(courseIds);
    setSelTopics([]);
  };

  return (
    <>
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
                loading={isCouLoading}
                showSearch
                mode="multiple"
                placeholder="Select from here..."
                options={mapToOptions(courses?.data)}
                className="[&_.ant-select-selector]:!min-h-10 !bg-transparent *:!rounded-lg "
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
                loading={isSubLoading}
                showSearch
                mode="multiple"
                placeholder="Select from here..."
                options={mapToOptions(subjects?.data)}
                className="[&_.ant-select-selector]:!min-h-10 !bg-transparent *:!rounded-lg "
                onChange={handleSubjectChange}
                disabled={selCourses.length === 0}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Topics"
              name="topics"
              // rules={[{ required: true, message: "Topics is required" }]}
              style={{ marginBottom: 0 }}
            >
              <Select
                loading={isToLoading}
                showSearch
                mode="multiple"
                placeholder="Select from here..."
                options={mapToOptions(topics?.data)}
                className="[&_.ant-select-selector]:!min-h-10 !bg-transparent *:!rounded-lg"
                disabled={selSubjects.length === 0}
                onChange={(topicsIds) => setSelTopics(topicsIds)}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <div>
              <button
                className="cursor-pointer disabled:cursor-not-allowed text-base font-medium block w-full bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
                type="submit"
                disabled={selTopics.length <= 0}
              >
                Search
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default QuesAssignFilter;
