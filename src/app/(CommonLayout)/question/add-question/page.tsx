"use client";
import React, { useState } from "react";
import { Col, Form, Input, Radio, Row, Select } from "antd";
import { TQuestion } from "@/types/question.type";
import { useAddQuestionMutation } from "@/redux/features/question/questionApi";
import { toast } from "sonner";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
import { useGetAllSubjectQuery } from "@/redux/features/subject/subjectApi";
import { useGetAllTopicQuery } from "@/redux/features/topic/topicApi";
import { convertParams, mapToOptions } from "@/utils";
import MDEditor from "@uiw/react-md-editor";

const AddQuestion = () => {
  const [selCourses, setSelCourses] = useState<string[]>([]);
  const [selSubjects, setSelSubjects] = useState<string[]>([]);
  const [selTopics, setSelTopics] = useState<string[]>([]);
  const [questionDetails, setQuestionDetails] = useState<any>("");
  const [form] = Form.useForm();

  const [addQuestion] = useAddQuestionMutation();

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

  const onSubmit = async (data: TQuestion) => {
    const toastId = toast.loading("Question Creating...");

    data.desc = questionDetails;
    console.log(data);
    try {
      const res = await addQuestion(data).unwrap();

      if (res?.success) {
        toast.success("Question added successfully", { id: toastId });
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
            <Row gutter={15}>
              <Col span={19}>
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

            <Row gutter={15}>
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

            <Row gutter={15} align="bottom">
              <Col span={9}>
                <Form.Item label="Courses" name="courses">
                  <Select
                    loading={isCouLoading}
                    showSearch
                    placeholder="Select from here..."
                    options={mapToOptions(courses?.data)}
                    className="[&_.ant-select-selector]:!min-h-10 !bg-transparent *:!rounded-lg "
                    onChange={handleCourseChange}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Subjects" name="subjects">
                  <Select
                    loading={isSubLoading}
                    showSearch
                    placeholder="Select from here..."
                    options={mapToOptions(subjects?.data)}
                    className="[&_.ant-select-selector]:!min-h-10 !bg-transparent *:!rounded-lg "
                    onChange={handleSubjectChange}
                    disabled={selCourses.length === 0}
                  />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item label="Topics" name="topics">
                  <Select
                    loading={isToLoading}
                    showSearch
                    placeholder="Select from here..."
                    options={mapToOptions(topics?.data)}
                    className="[&_.ant-select-selector]:!min-h-10 !bg-transparent *:!rounded-lg"
                    disabled={selSubjects.length === 0}
                    onChange={(topicsIds) => setSelTopics(topicsIds)}
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
                    Register
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
