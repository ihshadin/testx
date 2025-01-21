"use client";
import React, { useState } from "react";
import { getHoldQuestionsColumns } from "@/utils/AntdTableColumn/TableColumns";
import { Table } from "antd";
import { useGetAllQuestionQuery } from "@/redux/features/question/questionApi";

const FinalQuestionsPage = () => {
  const [params, setParams] = useState<any>([
    { name: "status", value: "completed" },
  ]);

  const { data: questions, isLoading: isQuesLoading } =
    useGetAllQuestionQuery(params);
  const columns = getHoldQuestionsColumns({});
  return (
    <section>
      <div className="max-w-7xl mx-auto py-8 px-2">
        <Table
          rowKey="_id"
          loading={isQuesLoading}
          // rowSelection={rowSelection}
          columns={columns}
          dataSource={questions?.data}
          scroll={{ x: 1500 }}
          pagination={false}
        />
      </div>
    </section>
  );
};

export default FinalQuestionsPage;
