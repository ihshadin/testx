"use client";
import React, { useState } from "react";
import { Col, Form, Input, Row, Select } from "antd";

const FilterUsers = () => {
  const [subjects, setSubjects] = useState([]);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [form] = Form.useForm();
  // TODO: type problem

  const subjectsData: any = [
    { _id: "1", label: "Anatomy", courseId: "2" },
    { _id: "2", label: "Physiology", courseId: "1" },
    { _id: "3", label: "Math", courseId: "1" },
    { _id: "4", label: "English", courseId: "2" },
    { _id: "5", label: "Science", courseId: "1" },
    { _id: "6", label: "History", courseId: "3" },
  ];

  const mapToOptions = (data: any) =>
    data.map(({ _id, label }: any) => ({ value: _id, label }));

  const handleSubjectChange = (subjectId: string) => {
    setIsBtnDisabled(false);
  };

  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
  };
  return (
    <div>
      <Form
        form={form}
        onFinish={onSubmit}
        requiredMark={false}
        layout="vertical"
      >
        <Row gutter={15} align="bottom">
          <Col span={20}>
            <Form.Item
              label="Subjects"
              name="subjects"
              // rules={[{ required: true, message: "Subjects is required" }]}
              style={{ marginBottom: 0 }}
            >
              <Select
                showSearch
                placeholder="Select from here..."
                options={mapToOptions(subjectsData)}
                className="!h-10 !bg-transparent *:!rounded-lg "
                onChange={handleSubjectChange}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
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
    </div>
  );
};

export default FilterUsers;
