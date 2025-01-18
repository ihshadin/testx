"use client";
import { Dispatch, useState } from "react";
import { Col, Form, Row, Select, Table } from "antd";
import { toast } from "sonner";
import { getUnassignColumns } from "@/utils/AntdTableColumn/TableColumns";
import { TableRowSelection } from "antd/es/table/interface";
import { TQuestion, TQuestions } from "@/types/question.type";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import {
  useDeleteQuestionMutation,
  useUpdateAssignmentMutation,
} from "@/redux/features/question/questionApi";
import { useGetAllUserQuery } from "@/redux/features/user/userApi";
import { TUser } from "@/types/user.type";

const AssignQuestions = ({
  questions,
  isQuesLoading,
  handleTeacher,
  setSearchTeacher,
}: TQuestions) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [form] = Form.useForm();

  const { data: teachers, isLoading: isTeaLoading } = useGetAllUserQuery([
    { name: "role", value: "teacher" },
    { name: "status", value: "approved" },
  ]);
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

  const mapToOptions = (data: TUser[]) =>
    data?.map(({ _id, first_name, last_name }) => ({
      value: _id,
      label: first_name + " " + last_name,
    }));

  return (
    <>
      <div className="mb-5 flex items-end justify-between gap-3">
        <div className="flex items-end gap-3 border border-primary/10 rounded-lg p-2">
          <div>
            <p className="mb-1">Search Teacher</p>
            <Select
              showSearch
              //   mode="multiple"
              placeholder="Select from here..."
              options={mapToOptions(teachers?.data)}
              className="!h-10 !bg-transparent *:!rounded-lg w-[300px]"
              onChange={(value) => setSearchTeacher(value)}
            />
          </div>
          <div>
            <button
              className="cursor-pointer disabled:cursor-not-allowed text-base font-medium block w-full bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
              type="submit"
              onClick={() => handleTeacher()}
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex items-end gap-3 border border-primary/10 rounded-lg p-2">
          <div>
            <p className="mb-1">Reassign Teacher</p>
            <Select
              showSearch
              mode="multiple"
              placeholder="Select from here..."
              options={mapToOptions(teachers?.data)}
              className="[&_.ant-select-selector]:!min-h-10 !bg-transparent *:!rounded-lg w-[300px]"
              onChange={() => setIsBtnDisabled(false)}
            />
          </div>
          <div>
            <button
              className="cursor-pointer disabled:cursor-not-allowed text-base font-medium block w-full bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
              type="submit"
              disabled={isBtnDisabled || selectedRowKeys.length === 0}
            >
              Assign
            </button>
          </div>
        </div>
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

export default AssignQuestions;
