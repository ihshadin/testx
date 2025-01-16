"use client";
import React, { useState } from "react";
import { Checkbox, Col, Form, Input, Row, Select } from "antd";
import logo from "@/assets/sites/logo.png";
import Image from "next/image";
import Link from "next/link";

const AddQuestion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [form] = Form.useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    console.log("submit button is work");
  };
  console.log(selectedRole);
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
      <div className="max-w-7xl mx-auto py-8 px-2 ">
        {/* <div className="flex flex-col md:flex-row justify-between md:items-end bg-secondary/10 border border-secondary/30 rounded-xl px-5 pt-12 pb-5 mb-5">
          <div className="justify-start items-center rounded-xl">
            <h4 className="text-2xl lg:text-4xl font-bold">Add Question</h4>
          </div>
        </div> */}
        <div className="mb-8 text-center">
          <h4 className="text-2xl lg:text-4xl font-bold">Add Question</h4>
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
                  label="Question Title"
                  name="question_title"
                  rules={[
                    { required: true, message: "Question Title is required" },
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
                  label="Question Description"
                  name="ques_desc"
                  rules={[
                    {
                      required: true,
                      message: "Question Description is required",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Write here..."
                    className="h-10 border border-[#C4CAD4] !rounded-lg"
                  />
                </Form.Item>
              </Col>
            </Row>
            {/* <Row gutter={15}>
              <Col span={10}>
                <Form.Item
                  label="Select Your Role"
                  name="role"
                  rules={[{ required: true, message: "User Role is required" }]}
                >
                  <Select
                    // loading={isDataLoading}
                    showSearch
                    placeholder="Select from here..."
                    options={userRole}
                    onChange={(value) => setSelectedRole(value)}
                    className="!h-10 *:!rounded-lg !bg-transparent"
                  />
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input.TextArea
                    placeholder="Write here..."
                    className="h-10 border border-[#C4CAD4] !rounded-lg"
                  />
                </Form.Item>
              </Col>
            </Row> */}
            {/* {selectedRole ? (
              <Row gutter={15}>
                <Col span={24}>
                  <p className="mb-6 text-sm text-accent/70">
                    {
                      userRole.find((role) => role.value === selectedRole)
                        ?.resDesc
                    }
                  </p>
                </Col>
              </Row>
            ) : (
              ""
            )} */}

            {/* <Row>
              <Col span={24}>
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Should accept agreement")
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    I agree to <a href="">Terms & Conditions</a> and
                    <a href=""> Privacy Policy</a>
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row> */}

            <Row>
              <Col span={24}>
                <div className="">
                  <button
                    className="cursor-pointer text-base font-medium block w-full bg-primary/5 hover:bg-primary text-primary hover:text-white border border-primary/30 hover:border-primary/60 px-4 py-2 rounded-xl transition duration-150"
                    type="submit"
                    disabled={isLoading ? true : false}
                  >
                    {isLoading ? "Loading..." : "Register"}
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

export default AddQuestion;
