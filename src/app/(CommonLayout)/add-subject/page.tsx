"use client";
import React, { useState } from "react";
import { Col, Form, Input, Row, Select } from "antd";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
import { TCourse } from "@/types/course.type";
import { TSubject } from "@/types/subject.type";
import { toast } from "sonner";
import { useAddSubjectMutation } from "@/redux/features/subject/subjectApi";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";

const AddSubjectPage = () => {
  const [addSubject] = useAddSubjectMutation();
  const { data: courses, isLoading } = useGetAllCourseQuery(undefined);
  const [form] = Form.useForm();

  const mapToOptions = (data: TCourse[]) =>
    data?.map(({ _id, name }) => ({ value: _id, label: name }));

  const onSubmit = async (data: TSubject) => {
    const toastId = toast.loading("Appointment Creating...");

    try {
      const res = await addSubject(data).unwrap();

      if (res?.success) {
        toast.success("Subject added successfully", { id: toastId });
        form.resetFields();
      } else {
        toast.error("Something went wrong!", { id: toastId });
      }
    } catch (error: any) {
      onsubmitErrorHandler(error, toastId);
    }
  };

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
                  name="name"
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
                  name="description"
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
                  name="courses"
                  rules={[
                    { required: true, message: "Course Selection is required" },
                  ]}
                >
                  <Select
                    loading={isLoading}
                    mode="multiple"
                    showSearch
                    placeholder="Select from here..."
                    options={mapToOptions(courses?.data)}
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
