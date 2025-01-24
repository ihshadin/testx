"use client";
import { useEffect, useState } from "react";
import { Col, Form, Popconfirm, Row, Select, Table } from "antd";
import { toast } from "sonner";
import { getTeaQuesColumns } from "@/utils/AntdTableColumn/TableColumns";
import { TableRowSelection } from "antd/es/table/interface";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import FilterByCourse from "./FilterByCourse";
import { useGetQuestionsQuery } from "@/redux/features/question/coordinator";
import { useUpdateQuestionsMutation } from "@/redux/features/question/questionApi";
import { TUser } from "@/types/user.type";
import { useGetTeachersQuery } from "@/redux/features/user/coordinator";

const SubQuestions = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [reassignTeacher, setReassignTeacher] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const [params, setParams] = useState<any>([
    { name: "status", value: "verified" },
  ]);
  const { data: teachers, isLoading: isTeaLoading } = useGetTeachersQuery([
    { name: "role", value: "teacher" },
    { name: "status", value: "approved" },
  ]);

  const { data: questions, isLoading: isQuesLoading } =
    useGetQuestionsQuery(params);
  const [updateQuestions] = useUpdateQuestionsMutation();

  // Row Selection functions
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const handleFilter = (data: Record<string, unknown>) => {
    setParams([
      ...params.filter((param: any) => param?.name === "status"),
      ...Object.entries(data)
        .filter(([, value]) => value)
        .map(([key, value]) => ({ name: key, value })),
    ]);
  };

  const handleAction = async (status: any) => {
    const toastId = toast.loading("Assigning teacher...");

    const updatedData = {
      questionIds: selectedRowKeys,
      status: status,
    };

    try {
      const res = await updateQuestions(updatedData).unwrap();
      if (res?.success) {
        toast.success("Assigned updated successfully", { id: toastId });
      }
    } catch (error: any) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  const handleReassignTeacher = async () => {
    const toastId = toast.loading("Assigning teacher...");

    const updatedData = {
      questionIds: selectedRowKeys,
      teacher: reassignTeacher,
      owner: reassignTeacher,
      status: "assigned",
    };

    try {
      const res = await updateQuestions(updatedData).unwrap();
      if (res?.success) {
        toast.success("Assigned updated successfully", { id: toastId });
        setReassignTeacher("");
      }
    } catch (error: any) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  const columns = getTeaQuesColumns({});

  const mapToOptions = (data: TUser[]) =>
    data?.map(({ _id, first_name, last_name }) => ({
      value: _id,
      label: first_name + " " + last_name,
    }));

  return (
    <>
      <div className="mb-10">
        <FilterByCourse handleFilter={handleFilter} />
      </div>
      <div className="mb-5 flex items-end justify-between gap-5">
        <div className="flex items-end gap-3 border border-primary/10 rounded-lg p-2">
          <Popconfirm
            title="Send for Revision"
            description="Are you sure to send for revision?"
            placement="topRight"
            onConfirm={() => handleAction("assigned")}
            okText="Yes"
            cancelText="No"
          >
            <button
              className="cursor-pointer disabled:cursor-not-allowed text-base font-medium bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
              type="submit"
              disabled={selectedRowKeys.length <= 0}
            >
              Revision Request
            </button>
          </Popconfirm>
          <Popconfirm
            title="Send for Revision"
            description="Are you sure to send for revision?"
            placement="topRight"
            onConfirm={() => handleAction("approved")}
            okText="Yes"
            cancelText="No"
          >
            <button
              className="cursor-pointer disabled:cursor-not-allowed text-base font-medium bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
              type="submit"
              disabled={selectedRowKeys.length <= 0}
            >
              Approved
            </button>
          </Popconfirm>
        </div>
        <div className="flex items-end gap-3 border border-primary/10 rounded-lg p-2">
          <div>
            <p className="mb-1">Reassign Another Teacher</p>
            <Select
              showSearch
              placeholder="Select from here..."
              options={mapToOptions(teachers?.data)}
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
              onClick={() => handleReassignTeacher()}
              disabled={isBtnDisabled || selectedRowKeys.length === 0}
            >
              Reassign
            </button>
          </div>
        </div>
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
