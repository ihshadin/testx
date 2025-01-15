"use client";
import React from "react";
import { Pagination, PaginationProps } from "antd";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import "@/styles/pagination.css";

export const itemRender: PaginationProps["itemRender"] = (
  _,
  type,
  originalElement
) => {
  if (type === "prev") {
    return (
      <a className="flex items-center gap-1">
        <LuArrowLeft className="text-xl" /> Previous
      </a>
    );
  }
  if (type === "next") {
    return (
      <a className="flex items-center gap-1">
        Next <LuArrowRight className="text-xl" />
      </a>
    );
  }
  return originalElement;
};
type TPaginationItems = {
  totalItems: number;
  itemsPerPage: number;
  setCurrentPage: any;
};

const PaginationItems = ({
  totalItems,
  itemsPerPage,
  setCurrentPage,
}: TPaginationItems) => {
  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex items-center justify-center">
      <Pagination
        total={totalItems}
        defaultCurrent={1}
        pageSize={itemsPerPage}
        itemRender={itemRender}
        onChange={onChange}
      />
    </div>
  );
};

export default PaginationItems;
