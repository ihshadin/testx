"use client";
import React, { useState } from "react";
import { Col, Form, Input, Row } from "antd";

const AddCoursePage = () => {
  const [form] = Form.useForm();

  const onSubmit = async (data: any) => {
    console.log("submit button is work");
  };

  return (
    <section>
      <div className="max-w-4xl mx-auto py-8 px-2 ">
        <div className="mb-8 text-center">
          <h4 className="text-2xl lg:text-4xl font-bold">Add Course</h4>
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
                  label="Course Title"
                  name="course_title"
                  rules={[
                    { required: true, message: "Course Title is required" },
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
                  label="Course Description (Optional)"
                  name="course_desc"
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Write here..."
                    className="h-10 border border-[#C4CAD4] !rounded-lg"
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
                    Add Course
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

export default AddCoursePage;
