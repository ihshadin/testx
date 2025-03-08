"use client";
import React, { useState } from "react";
import UnassignQuestions from "@/components/Questions/UnassignQuestions";
import { useGetAllQuestionQuery } from "@/redux/features/question/questionApi";
import FilterByCourse from "@/components/Questions/FilterByCourse";
import CustomPagination from "@/utils/Pagination";
import { Button, Input, Space, TableColumnType } from "antd";
import { FiSearch } from "react-icons/fi";
import Highlighter from "react-highlight-words";

const QuestionAssignmentPage = () => {
  const [searchText, setSearchText] = useState("");
  const [params, setParams] = useState<any>([
    { name: "status", value: "unassigned" },
  ]);

  const { data: questions, isLoading: isQuesLoading } =
    useGetAllQuestionQuery(params);

  const handleFilter = (data: Record<string, unknown>) => {
    setParams([
      ...params.filter((param: any) => param?.name === "status"),
      ...Object.entries(data)
        .filter(([, value]) => value)
        .map(([key, value]) => ({ name: key, value })),
    ]);
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

  return (
    <section>
      <div className="max-w-7xl mx-auto py-8 px-2">
        <div className="flex flex-col gap-5">
          <FilterByCourse handleFilter={handleFilter} />
          <UnassignQuestions
            questions={questions}
            isQuesLoading={isQuesLoading}
            getColumnSearchProps={getColumnSearchProps}
          />
          {questions?.meta?.totalPage > 1 && (
            <div className="mt-8 lg:mt-12">
              <CustomPagination meta={questions?.meta} setParams={setParams} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuestionAssignmentPage;
