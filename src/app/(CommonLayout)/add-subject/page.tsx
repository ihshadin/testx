"use client";
import React, { useState } from "react";
import { Col, Form, Input, Row, Select } from "antd";

const AddSubjectPage = () => {
  const [form] = Form.useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    console.log("submit button is work");
  };

  const userRole = [
    {
      value: "teacher",
      label: "Teacher",
      resDesc: "Teachers will be assigned to various courses.",
    },
    {
      value: "coordinator",
      label: "Coordinator",
      resDesc:
        "Each coordinator is responsible for overseeing the quality and progress of the content development.",
    },
  ];

  return (
    <section>
      <div className="max-w-4xl mx-auto py-8 px-2 ">
        <div className="mb-8 text-center">
          <h4 className="text-2xl lg:text-4xl font-bold">Add Subject</h4>
        </div>
        <div>
          <Form
            form={form}
            onFinish={onSubmit}
            requiredMark={false}
            layout="vertical"
          >
            <Row gutter={15}>
              <Col span={24}>
                <Form.Item
                  label="Subject Title"
                  name="subject_title"
                  rules={[
                    { required: true, message: "Subject Title is required" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Write here..."
                    className="h-10 border border-[#C4CAD4] !rounded-lg"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={15}>
              <Col span={24}>
                <Form.Item
                  label="Subject Description (Optional)"
                  name="subject_desc"
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Write here..."
                    className="h-10 border border-[#C4CAD4] !rounded-lg"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={15}>
              <Col span={24}>
                <Form.Item
                  label="Select Course"
                  name="course"
                  rules={[
                    { required: true, message: "Course Selection is required" },
                  ]}
                >
                  <Select
                    // loading={isDataLoading}
                    showSearch
                    placeholder="Select from here..."
                    options={userRole}
                    // onChange={(value) => setSelectedRole(value)}
                    className="!h-10 *:!rounded-lg !bg-transparent"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <div className="">
                  <button
                    className="cursor-pointer text-base font-medium block w-full bg-primary/5 hover:bg-primary text-primary hover:text-white border border-primary/30 hover:border-primary/60 px-4 py-2 rounded-xl transition duration-150"
                    type="submit"
                  >
                    Add Subject
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default AddSubjectPage;
