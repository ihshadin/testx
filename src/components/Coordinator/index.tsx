"use client";
import { useState } from "react";
import { Input, Select, Table } from "antd";
import { toast } from "sonner";
import {
  getAssignColumns,
  getTeachersColumns,
} from "@/utils/AntdTableColumn/TableColumns";
import { TableRowSelection } from "antd/es/table/interface";
import { TQuestions } from "@/types/question.type";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import {
  useDeleteQuestionMutation,
  useGetAllQuestionQuery,
  useUpdateQuestionsMutation,
} from "@/redux/features/question/questionApi";
import { useGetAllUserQuery } from "@/redux/features/user/userApi";
import { TUser } from "@/types/user.type";

const CoordinatorAssignment = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [reassignTeacher, setReassignTeacher] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [params, setParams] = useState<any>([
    { name: "role", value: "teacher" },
    { name: "status", value: "approved" },
    { name: "coordinator", value: "null" },
  ]);
  //   const { data: users, isLoading: isUsersLoading } =
  //     useGetAllUserQuery(params);

  const handleSearch = (text: string) => {
    setParams([
      { name: "role", value: "teacher" },
      { name: "status", value: "approved" },
      { name: "searchTerm", value: text },
      { name: "coordinator", value: "null" },
    ]);
  };
  // Teachers
  const { data: teachers, isLoading: isTeaLoading } =
    useGetAllUserQuery(params);
  // Coordinators
  const { data: coordinators, isLoading: isCoorLoading } = useGetAllUserQuery([
    { name: "role", value: "coordinator" },
    { name: "status", value: "approved" },
  ]);

  const [updateQuestions] = useUpdateQuestionsMutation();
  // Delete Questions
  const [deleteQuestion] = useDeleteQuestionMutation();

  // Row Selection functions
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Question Deleting...");
    try {
      await deleteQuestion(id).unwrap();
      toast.success("Question Delete Successful", { id: toastId });
    } catch (error) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  const columns = getTeachersColumns({
    handleDelete,
  });

  const handleCoordinator = async () => {
    const toastId = toast.loading("Updating Coordinator...");

    const updatedData = {
      questionIds: selectedRowKeys,
      teacher: reassignTeacher,
      owner: reassignTeacher,
    };

    console.log("updatedData", updatedData);

    try {
      const res = await updateQuestions(updatedData).unwrap();
      if (res?.success) {
        toast.success("Coordinator updated successfully", { id: toastId });
        setReassignTeacher("");
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
            <Input
              placeholder="Search here..."
              className="!h-10 !bg-transparent *:!rounded-lg !w-[400px]"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-end gap-3 border border-primary/10 rounded-lg p-2">
          <div>
            <p className="mb-1">Coordinators</p>
            <Select
              loading={isCoorLoading}
              showSearch
              placeholder="Select from here..."
              options={mapToOptions(coordinators?.data)}
              className="!h-10 !bg-transparent *:!rounded-lg w-[300px]"
              onChange={(teacher) => {
                setReassignTeacher(teacher), setIsBtnDisabled(false);
              }}
              disabled={selectedRowKeys.length <= 0}
            />
          </div>
          <div>
            <button
              className="cursor-pointer disabled:cursor-not-allowed text-base font-medium block w-full bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
              type="submit"
              onClick={() => handleCoordinator()}
              disabled={isBtnDisabled || selectedRowKeys.length === 0}
            >
              Assign
            </button>
          </div>
        </div>
      </div>
      <Table
        rowKey="_id"
        loading={isTeaLoading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={teachers?.data}
        // scroll={{ x: 1500 }}
        pagination={false}
      />
    </>
  );
};

export default CoordinatorAssignment;