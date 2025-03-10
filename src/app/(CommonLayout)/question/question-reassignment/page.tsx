"use client";
import React, { useState } from "react";
import { useGetAllQuestionQuery } from "@/redux/features/question/questionApi";
import AssignQuestions from "@/components/Questions/AssignQuestions";
import CustomPagination from "@/utils/Pagination";
import { Button, Input, Space, TableColumnType } from "antd";
import { FiSearch } from "react-icons/fi";
import Highlighter from "react-highlight-words";

const QuestionReassignmentPage = () => {
  const [searchTeacher, setSearchTeacher] = useState("");
  const [searchText, setSearchText] = useState("");
  const [params, setParams] = useState<any>([
    { name: "status", value: "assigned" },
  ]);

  const { data, isLoading: isQuesLoading } = useGetAllQuestionQuery(params);

  const handleTeacherSearch = () => {
    setParams([
      { name: "status", value: "assigned" },
      { name: "teacher", value: searchTeacher },
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
        <div className="">
          <AssignQuestions
            questions={data}
            isQuesLoading={isQuesLoading}
            handleTeacherSearch={handleTeacherSearch}
            setSearchTeacher={setSearchTeacher}
            getColumnSearchProps={getColumnSearchProps}
          />
          {data?.meta?.totalPage > 1 && (
            <div className="mt-8 lg:mt-12">
              <CustomPagination meta={data?.meta} setParams={setParams} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuestionReassignmentPage;
