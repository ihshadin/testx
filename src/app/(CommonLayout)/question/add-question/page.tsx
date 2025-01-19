"use client";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import logo from "@/assets/sites/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaRegMinusSquare } from "react-icons/fa";
import { PiMinusLight, PiMinusSquareThin } from "react-icons/pi";
import { CiSquareMinus } from "react-icons/ci";
import { optional } from "zod";
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
              <Col span={24}>
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
            </Row>

            <Row gutter={15}>
              <Col span={24}>
                <div className="mb-6" data-color-mode="light">
                  <MDEditor
                    value={questionDetails}
                    onChange={setQuestionDetails}
                    preview="preview"
                    components={{
                      toolbar: (command, disabled, executeCommand) => {
                        if (command.keyCommand === "code") {
                          return (
                            <button
                              aria-label="Insert code"
                              disabled={disabled}
                              onClick={(evn) => {
                                evn.stopPropagation();
                                executeCommand(command, command.groupName);
                              }}
                            >
                              Code
                            </button>
                          );
                        }
                      },
                    }}
                  />
                </div>
              </Col>
            </Row>

            <Row gutter={30}>
              <Col span={17}>
                <Form.List name="options">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => (
                        <div key={key} className="flex items-center gap-3 mb-4">
                          <span className="bg-primary/5 h-10 flex justify-center items-center px-4 rounded-lg">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <Form.Item
                            {...restField}
                            name={[name]}
                            rules={[
                              {
                                required: true,
                                message: "Option is required",
                              },
                            ]}
                            style={{ marginBottom: 0 }}
                            className="grow"
                          >
                            <Input
                              type="text"
                              placeholder="Write here..."
                              className="h-10 border border-[#C4CAD4] !rounded-lg"
                            />
                          </Form.Item>
                          <CiSquareMinus
                            onClick={() => remove(name)}
                            className="text-4xl cursor-pointer"
                          />
                        </div>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          disabled={fields.length >= 4}
                        >
                          Add Option
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Col>

              <Col span={7}>
                <Form.Item
                  label="Question ID"
                  name="question_id"
                  rules={[
                    { required: true, message: "Question ID is required" },
                  ]}
                  style={{ marginBottom: "10px" }}
                >
                  <InputNumber
                    placeholder="Write here..."
                    className="h-10 border border-[#C4CAD4] !rounded-lg !w-full"
                    minLength={3}
                    maxLength={5}
                    prefix="Q"
                  />
                </Form.Item>
                <Form.Item
                  label="Domain (Optional)"
                  name="domain"
                  style={{ marginBottom: "10px" }}
                >
                  <Input
                    type="text"
                    placeholder="Write here..."
                    className="h-10 border border-[#C4CAD4] !rounded-lg"
                  />
                </Form.Item>
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

            <Row gutter={15} align="bottom">
              <Col span={9}>
                <Form.Item label="Courses" name="courses">
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
              <Col span={6}>
                <Form.Item label="Subjects" name="subjects">
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
              <Col span={9}>
                <Form.Item label="Topics" name="topics">
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
            </Row>

            {/* <Row gutter={15}>
              <Col span={24}>
                <Form.Item
                  label="Question Description"
                  name="desc"
                  rules={[
                    {
                      required: true,
                      message: "Question Description is required",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={5}
                    placeholder="Write here..."
                    className="h-10 border border-[#C4CAD4] !rounded-lg"
                  />
                </Form.Item>
              </Col>
            </Row> */}

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
