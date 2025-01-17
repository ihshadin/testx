"use client";
import { useState } from "react";
import { Col, Form, Row, Select, Table } from "antd";
import { toast } from "sonner";
import { getUnassignColumns } from "@/utils/AntdTableColumn/TableColumns";
import { TableRowSelection } from "antd/es/table/interface";
import { TQuestion } from "@/types/question.type";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import {
  useDeleteQuestionMutation,
  useUpdateAssignmentMutation,
} from "@/redux/features/question/questionApi";
import { mapToOptions } from "@/utils";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
import { getUserInfo } from "@/utils/localStorage/localStorageAuthManagement";

type TQuestions = {
  questions: TQuestion[];
  isQuesLoading: boolean;
};

const UnassignQuestions = ({ questions, isQuesLoading }: TQuestions) => {
  // TODO: type any fix
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [form] = Form.useForm();

  const { data: teachers, isLoading: isTeaLoading } =
    useGetAllCourseQuery(undefined);
  const [updateAssignment] = useUpdateAssignmentMutation();

  // Row Selection functions
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  // Delete Questions
  const [deleteQuestion] = useDeleteQuestionMutation();

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Question Deleting...");
    try {
      await deleteQuestion(id).unwrap();
      toast.success("Question Delete Successful", { id: toastId });
    } catch (error) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  const columns = getUnassignColumns({
    handleDelete,
  });

  const result = questions;

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Assigning teacher...");

    const filteredData = {
      questionIds: selectedRowKeys,
      teachers: data?.teachers,
    };

    try {
      const res = await updateAssignment(filteredData).unwrap();
      if (res?.success) {
        toast.success("Assigned updated successfully", { id: toastId });
        form.resetFields();
      }
    } catch (error: any) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  return (
    <>
      <div className="mb-3">
        <Form
          form={form}
          onFinish={onSubmit}
          requiredMark={false}
          layout="vertical"
        >
          <Row gutter={15} align="bottom">
            <Col span={10}>
              <Form.Item
                label="Teacher"
                name="teachers"
                style={{ marginBottom: 0 }}
              >
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select from here..."
                  options={mapToOptions(teachers?.data)}
                  className="[&_.ant-select-selector]:!min-h-10 !bg-transparent *:!rounded-lg "
                  onChange={() => setIsBtnDisabled(false)}
                  disabled={selectedRowKeys.length <= 0}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <div>
                <button
                  className="cursor-pointer disabled:cursor-not-allowed text-base font-medium block w-full bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
                  type="submit"
                  disabled={isBtnDisabled || selectedRowKeys.length === 0}
                >
                  Assign Teacher
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
        dataSource={result}
        scroll={{ x: 1500 }}
        pagination={false}
      />
    </>
  );
};

export default UnassignQuestions;
