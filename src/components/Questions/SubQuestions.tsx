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

const SubQuestions = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [params, setParams] = useState<any>([
    { name: "status", value: "verified" },
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

  const columns = getTeaQuesColumns({});

  return (
    <>
      <div className="mb-10">
        <FilterByCourse handleFilter={handleFilter} />
      </div>
      <div className="mb-5 flex gap-5">
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
          >
            Approved
          </button>
        </Popconfirm>
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
