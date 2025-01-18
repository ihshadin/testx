"use client";
import React, { useState } from "react";

import { Col, Form, Row, Select } from "antd";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
import { useGetAllSubjectQuery } from "@/redux/features/subject/subjectApi";
import { convertParams, mapToOptions } from "@/utils";

const FilterUsers = ({ onSubmit }: any) => {
  const [selCourses, setSelCourses] = useState<string[]>([]);
  const [selSubjects, setSelSubjects] = useState<string[]>([]);
  const [form] = Form.useForm();

  const { data: courses, isLoading: isCouLoading } =
    useGetAllCourseQuery(undefined);

  const { data: subjects, isLoading: isSubLoading } = useGetAllSubjectQuery(
    convertParams("courses", selCourses)
  );

  const handleCourseChange = (courseIds: string[]) => {
    form.setFieldsValue({ subjects: [], topics: [] });
    setSelCourses(courseIds);
    setSelSubjects([]);
  };

  const handleSubjectChange = (courseIds: string[]) => {
    form.setFieldsValue({ topics: [] });
    setSelSubjects(courseIds);
  };

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      requiredMark={false}
      layout="vertical"
    >
      <Row gutter={15} align="bottom">
        <Col span={10}>
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
        <Col span={8}>
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

        <Col span={6}>
          <div>
            <button
              className="cursor-pointer disabled:cursor-not-allowed text-base font-medium block w-full bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
              type="submit"
              // disabled={false}
            >
              Search
            </button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterUsers;
