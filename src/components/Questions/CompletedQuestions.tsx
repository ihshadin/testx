"use client";
import { useState } from "react";
import { Input, Form, Select, Table, GetProps } from "antd";
const { Search } = Input;
import { toast } from "sonner";
import { getAssignColumns } from "@/utils/AntdTableColumn/TableColumns";
import { TableRowSelection } from "antd/es/table/interface";
import { TQuestions } from "@/types/question.type";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import {
  useDeleteQuestionMutation,
  useUpdateAssignmentMutation,
} from "@/redux/features/question/questionApi";
import { useGetAllUserQuery } from "@/redux/features/user/userApi";
import { TUser } from "@/types/user.type";

const CompletedQuestions = ({
  questions,
  isQuesLoading,
  setSearchText,
}: any) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [reassignTeacher, setReassignTeacher] = useState([]);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

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

  const columns = getAssignColumns({
    handleDelete,
  });

  const handleReassignTeacher = async () => {
    const toastId = toast.loading("Assigning teacher...");

    const filteredData = {
      questionIds: selectedRowKeys,
      teachers: reassignTeacher,
      status: "assigned",
    };

    try {
      const res = await updateAssignment(filteredData).unwrap();
      if (res?.success) {
        toast.success("Assigned updated successfully", { id: toastId });
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
      <div className="mb-5 flex items-end justify-center gap-3">
        <div className="flex items-end gap-3 border border-primary/10 rounded-lg p-2">
          <div>
            <p className="mb-1">
              Search Question by Questions Name or Description
            </p>
            {/* <Select
              showSearch
              mode="multiple"
              placeholder="Select from here..."
              options={mapToOptions(teachers?.data)}
              className="!h-10 !bg-transparent *:!rounded-lg w-[400px]"
              onChange={(value) => setSearchTeacher(value)}
            /> */}
            <Input
              placeholder="input search text"
              className="!h-10 !bg-transparent *:!rounded-lg w-[400px]"
              // enterButton="Search"
              // size="large"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div>
            <button
              className="cursor-pointer disabled:cursor-not-allowed text-base font-medium block w-full bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
              type="submit"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <Table
        rowKey="_id"
        loading={isQuesLoading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={questions}
        scroll={{ x: 1500 }}
        pagination={false}
      />
    </>
  );
};

export default CompletedQuestions;
