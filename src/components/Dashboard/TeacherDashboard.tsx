"use client";
import { useState } from "react";
import { Table } from "antd";
import { getTeaQuesColumns } from "@/utils/AntdTableColumn/TableColumns";
import { TableRowSelection } from "antd/es/table/interface";
import { useGetAllQuestionQuery } from "@/redux/features/question/questionApi";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import FilterByCourse from "../Questions/FilterByCourse";

const TeacherDashboard = () => {
  const { data: user } = useGetUserQuery(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [params, setParams] = useState<any>([
    { name: "owner", value: user?.data?._id },
    { name: "status", value: "assigned" },
  ]);

  const { data: questions, isLoading: isQuesLoading } =
    useGetAllQuestionQuery(params);

  const handleFilter = (data: Record<string, unknown>) => {
    setParams([
      ...params.filter((param: any) => param?.name === "owner"),
      ...params.filter((param: any) => param?.name === "status"),
      ...Object.entries(data)
        .filter(([, value]) => value)
        .map(([key, value]) => ({ name: key, value })),
    ]);
  };

  // Row Selection functions
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const columns = getTeaQuesColumns({});

  return (
    <>
      <div className="mb-8">
        <FilterByCourse handleFilter={handleFilter} />
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
export default TeacherDashboard;
