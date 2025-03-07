"use client";
import React, { useState } from "react";
import { Col, Form, Input, InputNumber, Radio, Row, Select } from "antd";
import { TQuestion } from "@/types/question.type";
import { useAddQuestionMutation } from "@/redux/features/question/questionApi";
import { toast } from "sonner";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
import { useGetAllSubjectQuery } from "@/redux/features/subject/subjectApi";
import { useGetAllTopicQuery } from "@/redux/features/topic/topicApi";
import { mapToOptions } from "@/utils";
import MDEditor from "@uiw/react-md-editor";

const AddQuestion = () => {
  const [selCourse, setSelCourse] = useState<string>("");
  const [selSubject, setSelSubject] = useState<string>("");
  const [selTopic, setSelTopic] = useState<string>("");
  const [questionDetails, setQuestionDetails] = useState<any>("");
  const [form] = Form.useForm();

  const [addQuestion] = useAddQuestionMutation();

  const { data: courses, isLoading: isCouLoading } =
    useGetAllCourseQuery(undefined);
  const { data: subjects, isLoading: isSubLoading } = useGetAllSubjectQuery([
    { name: "course", value: selCourse },
  ]);
  const { data: topics, isLoading: isToLoading } = useGetAllTopicQuery([
    { name: "subject", value: selSubject },
  ]);

  const handleCourseChange = (courseId: string) => {
    form.setFieldsValue({ subject: undefined, topic: undefined });
    setSelCourse(courseId);
    setSelSubject("");
    setSelTopic("");
  };

  const handleSubjectChange = (courseId: string) => {
    form.setFieldsValue({ topic: undefined });
    setSelSubject(courseId);
    setSelTopic("");
  };

  const onSubmit = async (data: TQuestion) => {
    const toastId = toast.loading("Question Creating...");

    data.desc = questionDetails;

    try {
      const res = await addQuestion(data).unwrap();

      if (res?.success) {
        toast.success("Question added successfully", { id: toastId });
        form.resetFields();
        setQuestionDetails(" ");
      } else {
        toast.error("Something went wrong!", { id: toastId });
      }
    } catch (error: any) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto py-8 px-2 ">
        <div className="mb-5 text-left">
          <h4 className="text-xl lg:text-2xl font-bold">Add Question</h4>
        </div>
        <div>
          <Form
            form={form}
            onFinish={onSubmit}
            requiredMark={false}
            layout="vertical"
          >
            <Row gutter={20}>
              <Col span={2}>
                <Form.Item
                  label="Q. ID"
                  name="qId"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    type="number"
                    placeholder="1234"
                    className="h-10 border border-[#C4CAD4] !rounded-lg"
                    prefix="Q"
                    max={9999}
                  />
                </Form.Item>
              </Col>

              <Col span={17}>
                <Form.Item
                  label="Question Title"
                  name="title"
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

              <Col span={5}>
                <Form.Item
                  name="difficulty_level"
                  label="Difficulty Level"
                  rules={[{ required: true, message: "Please select a level" }]}
                >
                  <Radio.Group size="large">
                    <Radio.Button value="easy">Easy</Radio.Button>
                    <Radio.Button value="medium">Medium</Radio.Button>
                    <Radio.Button value="hard">Hard</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={24}>
                <div className="mb-6" data-color-mode="light">
                  <MDEditor
                    value={questionDetails}
                    onChange={setQuestionDetails}
                    preview="live"
                    style={{ fontFamily: "Archivo" }}
                  />
                </div>
              </Col>
            </Row>

            <Row gutter={20} align="bottom">
              <Col span={9}>
                <Form.Item label="Course" name="course">
                  <Select
                    loading={isCouLoading}
                    showSearch
                    placeholder="Select from here..."
                    options={mapToOptions(courses?.data)}
                    className="[&_.ant-select-selector]:!min-h-10 !h-10 !bg-transparent *:!rounded-lg "
                    onChange={handleCourseChange}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Subject" name="subject">
                  <Select
                    loading={isSubLoading}
                    showSearch
                    placeholder="Select from here..."
                    options={mapToOptions(subjects?.data)}
                    className="[&_.ant-select-selector]:!min-h-10 !h-10 !bg-transparent *:!rounded-lg "
                    onChange={handleSubjectChange}
                    disabled={selCourse.length === 0}
                  />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item label="Topic" name="topic">
                  <Select
                    loading={isToLoading}
                    showSearch
                    placeholder="Select from here..."
                    options={mapToOptions(topics?.data)}
                    className="[&_.ant-select-selector]:!min-h-10 !h-10 !bg-transparent *:!rounded-lg"
                    disabled={selSubject.length === 0}
                    onChange={(topicsId) => setSelTopic(topicsId)}
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
                    Add Question
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
