"use client";
import { useEffect, useState } from "react";
import { Col, Form, Row, Select, Table } from "antd";
import { toast } from "sonner";
import { getTeaQuesColumns } from "@/utils/AntdTableColumn/TableColumns";
import { TableRowSelection } from "antd/es/table/interface";
import { TQuestion } from "@/types/question.type";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import {
  useDeleteQuestionMutation,
  useGetAllQuestionQuery,
  useGetAllUnassignQuestionQuery,
  useUpdateAssignmentMutation,
} from "@/redux/features/question/questionApi";
import {
  useGetAllUserQuery,
  useGetUserQuery,
} from "@/redux/features/user/userApi";
import { TUser } from "@/types/user.type";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
import { useGetAllSubjectQuery } from "@/redux/features/subject/subjectApi";
import { convertParams, mapToOptions } from "@/utils";
import { useGetAllTopicQuery } from "@/redux/features/topic/topicApi";

const SubQuestions = () => {
  const { data: user } = useGetUserQuery(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [selCourses, setSelCourses] = useState<string[]>([]);
  const [selSubjects, setSelSubjects] = useState<string[]>([]);
  const [selTopics, setSelTopics] = useState<string[]>([]);
  const [params, setParams] = useState<any>([
    { name: "teachers", value: JSON.stringify([user?.data?._id]) },
  ]);
  const [form] = Form.useForm();

  const { data: questions, isLoading: isQuesLoading } =
    useGetAllQuestionQuery(params);

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

  const handleFilter = (data: Record<string, unknown>) => {
    const convertToCustomArray = (filters: any, userId: string) => {
      const customArray = Object.entries(filters)
        .filter(([_, value]: any) => value.length > 0)
        .map(([key, value]) => ({
          name: key,
          value: JSON.stringify(value),
        }));

      // Ensure the "teachers" filter is always included
      customArray.push({
        name: "teachers",
        value: JSON.stringify([userId]),
      });

      return customArray;
    };

    setParams(convertToCustomArray(data, user?.data?._id));
  };

  useEffect(() => {}, [params]);

  // Row Selection functions
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  // Delete Questions
  const [deleteQuestion] = useDeleteQuestionMutation();

  const handleViewDetails = async (id: string) => {
    const toastId = toast.loading("Question Deleting...");
    try {
      await deleteQuestion(id).unwrap();
      toast.success("Question Delete Successful", { id: toastId });
    } catch (error) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  const columns = getTeaQuesColumns({
    handleViewDetails,
  });

  return (
    <>
      <div className="mb-8">
        <Form
          form={form}
          onFinish={handleFilter}
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
            <Col span={5}>
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
            <Col span={8}>
              <Form.Item
                label="Topics"
                name="topics"
                // rules={[{ required: true, message: "Topics is required" }]}
                style={{ marginBottom: 0 }}
              >
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
            <Col span={3}>
              <div>
                <button
                  className="cursor-pointer disabled:cursor-not-allowed text-base font-medium block w-full bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
                  type="submit"
                  // disabled={selTopics.length <= 0}
                >
                  Search
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
      <Table
        rowKey="_id"
        loading={isQuesLoading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={questions?.data}
        scroll={{ x: 1500 }}
        pagination={false}
      />
    </>
  );
};

export default SubQuestions;
