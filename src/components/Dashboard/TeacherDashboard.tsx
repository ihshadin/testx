"use client";
import { useState } from "react";
import { Button, Input, Space, Table, TableColumnType } from "antd";
import { getTeaQuesColumns } from "@/utils/AntdTableColumn/TableColumns";
import { TableRowSelection } from "antd/es/table/interface";
import FilterByCourse from "../Questions/FilterByCourse";
import { useGetTeacherQuestionsQuery } from "@/redux/features/question/teacher";
import CustomPagination from "@/utils/Pagination";
import Highlighter from "react-highlight-words";
import { FiSearch } from "react-icons/fi";

const TeacherDashboard = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchText, setSearchText] = useState("");
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

  const handleSearch = () => {
    setParams([
      ...params.filter((param: any) => param?.name === "status"),
      ...(searchText ? [{ name: "searchTerm", value: searchText }] : []),
    ]);
  };

  const getColumnSearchProps = (): TableColumnType => ({
    filterDropdown: ({ close }) => (
      <div className="p-2 flex flex-col w-[165px]">
        <Input
          placeholder={`Search by ID`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix="Q"
          style={{ marginBottom: 8, width: "100%" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch()}
            size="small"
            style={{ width: 70 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              close();
            }}
            size="small"
            style={{ width: 70 }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <FiSearch style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    render: (text) =>
      searchText ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSortOrder = () => {
    const nextSortOrder =
      sortOrder === "" ? "qId" : sortOrder === "qId" ? "-qId" : "";
    setSortOrder(nextSortOrder);

    const updatedParams = params.filter((param: any) => param.name !== "sort");

    if (nextSortOrder) {
      updatedParams.push({ name: "sort", value: nextSortOrder });
    }

    setParams(updatedParams);
  };

  const columns = getTeaQuesColumns({
    meta: questions?.meta,
    getColumnSearchProps,
  });

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
        onChange={handleSortOrder}
      />
      {questions?.meta?.totalPage > 1 && (
        <div className="mt-8 lg:mt-12">
          <CustomPagination meta={questions?.meta} setParams={setParams} />
        </div>
      )}
    </>
  );
};
export default TeacherDashboard;
