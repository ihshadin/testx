"use client";
import React, { useState } from "react";
import { getHoldQuestionsColumns } from "@/utils/AntdTableColumn/TableColumns";
import { Table } from "antd";
import { useGetAllQuestionQuery } from "@/redux/features/question/questionApi";
import CustomPagination from "@/utils/Pagination";

const FinalQuestionsPage = () => {
  const [params, setParams] = useState<any>([
    { name: "status", value: "completed" },
    { name: "limit", value: 3 },
  ]);

  const { data: questions, isLoading: isQuesLoading } =
    useGetAllQuestionQuery(params);
  const columns = getHoldQuestionsColumns({ meta: questions?.meta });
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
        {questions?.meta?.totalPage > 1 && (
          <div className="mt-8 lg:mt-12">
            <CustomPagination meta={questions?.meta} setParams={setParams} />
          </div>
        )}
      </div>
    </section>
  );
};

export default FinalQuestionsPage;
