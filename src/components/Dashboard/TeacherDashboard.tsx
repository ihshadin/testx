"use client";
import { useState } from "react";
import { Table } from "antd";
import { getTeaQuesColumns } from "@/utils/AntdTableColumn/TableColumns";
import { TableRowSelection } from "antd/es/table/interface";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import FilterByCourse from "../Questions/FilterByCourse";
import { useGetTeacherQuestionsQuery } from "@/redux/features/question/teacher";

const TeacherDashboard = () => {
  const { data: user } = useGetUserQuery(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [params, setParams] = useState<any>([]);

  const { data: questions, isLoading: isQuesLoading } =
    useGetTeacherQuestionsQuery(params);

  const handleFilter = (data: Record<string, unknown>) => {
    setParams([
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
