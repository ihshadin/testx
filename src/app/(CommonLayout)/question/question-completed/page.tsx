"use client";
import React, { useEffect, useState } from "react";
import { useGetAllQuestionQuery } from "@/redux/features/question/questionApi";
import CompletedQuestions from "@/components/Questions/CompletedQuestions";

const CompletedQuestionsPage = () => {
  const [searchText, setSearchText] = useState("");
  const [params, setParams] = useState<any>([
    { name: "status", value: "approved" },
  ]);
  const { data: questions, isLoading: isQuesLoading } =
    useGetAllQuestionQuery(params);

  const handleSeach = () => {
    setParams((prevParams: any) => {
      const updatedParams = searchText
        ? [
            ...prevParams.filter((param: any) => param.name !== "searchTerm"),
            { name: "searchTerm", value: searchText },
          ]
        : [{ name: "status", value: "approved" }];
      return updatedParams;
    });

    console.log(params);
  };

  useEffect(() => {
    handleSeach();
  }, [searchText]);

  return (
    <section>
      <div className="max-w-7xl mx-auto py-8 px-2">
        <div className="">
          <CompletedQuestions
            questions={questions?.data}
            isQuesLoading={isQuesLoading}
            setSearchText={setSearchText}
          />
        </div>
      </div>
    </section>
  );
};

export default CompletedQuestionsPage;
