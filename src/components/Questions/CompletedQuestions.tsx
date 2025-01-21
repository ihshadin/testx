"use client";
import React from "react";
import { Input, Table } from "antd";
import { toast } from "sonner";
import { getComQuesColumns } from "@/utils/AntdTableColumn/TableColumns";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import { useUpdateQuestionMutation } from "@/redux/features/question/questionApi";

const CompletedQuestions = ({
  questions,
  isQuesLoading,
  setSearchText,
}: any) => {
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [updateQuestion] = useUpdateQuestionMutation();

  // Row Selection functions
  // const rowSelection: TableRowSelection<any> = {
  //   selectedRowKeys,
  //   onChange: (newSelectedRowKeys: React.Key[]) => {
  //     setSelectedRowKeys(newSelectedRowKeys);
  //   },
  // };

  const handleAction = async (id: string) => {
    const toastId = toast.loading("Question Updating...");

    const updateData = {
      id: id,
      data: {
        status: "completed",
      },
    };

    try {
      const res = await updateQuestion(updateData).unwrap();
      if (res?.success) {
        toast.success("Question updated successfully", { id: toastId });
      }
    } catch (error: any) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  const columns = getComQuesColumns({
    handleAction,
  });

  return (
    <>
      <div className="mb-5 flex items-end justify-center gap-3">
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
      </div>
      <Table
        rowKey="_id"
        loading={isQuesLoading}
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={questions}
        scroll={{ x: 1500 }}
        pagination={false}
      />
    </>
  );
};

export default CompletedQuestions;
