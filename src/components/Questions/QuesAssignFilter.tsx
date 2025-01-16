import React from "react";

import { Col, Form, Row, Select } from "antd";
import { TCourse } from "@/types/course.type";

const QuesAssignFilter = ({
  onSubmit,
  courses,
  subjects,
  topics,
  handleCourseChange,
  handleSubjectChange,
  isSubDisabled,
  isTopDisabled,
  isBtnDisabled,
  setIsBtnDisabled,
}: any) => {
  const [form] = Form.useForm();
  const mapToOptions = (data: TCourse[]) =>
    data?.map(({ _id, name }) => ({ value: _id, label: name }));

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
                showSearch
                mode="multiple"
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
                mode="multiple"
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
              // rules={[{ required: true, message: "Topics is required" }]}
              style={{ marginBottom: 0 }}
            >
              <Select
                showSearch
                mode="multiple"
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
    </>
  );
};

export default QuesAssignFilter;
