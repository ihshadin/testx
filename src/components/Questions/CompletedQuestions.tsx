"use client";
import React, { useState } from "react";
import { Input, Popconfirm, Table } from "antd";
import { toast } from "sonner";
import { getComQuesColumns } from "@/utils/AntdTableColumn/TableColumns";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import {
  useUpdateQuestionMutation,
  useUpdateQuestionsMutation,
} from "@/redux/features/question/questionApi";
import { TableRowSelection } from "antd/es/table/interface";

const CompletedQuestions = ({
  questions,
  isQuesLoading,
  setSearchText,
}: any) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [updateQuestions] = useUpdateQuestionsMutation();

  // Row Selection functions
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const handleAction = async (id?: string) => {
    const toastId = toast.loading("Question Updating...");

    const updateData = {
      questionIds: id ? [id] : selectedRowKeys,
      status: "completed",
    };

    try {
      const res = await updateQuestions(updateData).unwrap();
      if (res?.success) {
        toast.success("Question updated successfully", { id: toastId });
      }
    } catch (error: any) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  const columns = getComQuesColumns({
    handleAction,
    meta: questions?.meta,
  });

  return (
    <>
      <div className="mb-5 flex items-end justify-between gap-3">
        <div className="flex items-end gap-3 border border-primary/10 rounded-lg p-2">
          <div>
            <p className="mb-1">
              Search Question by Questions Name or Description
            </p>
            <Input
              placeholder="input search text"
              className="!h-10 !bg-transparent *:!rounded-lg w-[400px]"
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
        <Popconfirm
          title="Mark as Complete"
          description="Are you sure to complete those questions?"
          placement="topRight"
          onConfirm={() => handleAction()}
          okText="Yes"
          cancelText="No"
        >
          <button
            className="cursor-pointer disabled:cursor-not-allowed text-base font-medium bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
            type="submit"
            disabled={selectedRowKeys.length <= 0}
          >
            Complete Selection
          </button>
        </Popconfirm>
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
