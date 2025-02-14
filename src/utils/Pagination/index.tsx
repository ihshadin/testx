"use client";
import React from "react";
import { Pagination, PaginationProps } from "antd";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "@/styles/pagination.css";
import { TPagination } from "@/types/global.type";

export const itemRender: PaginationProps["itemRender"] = (
  _,
  type,
  originalElement
) => {
  if (type === "prev") {
    return (
      <a className="flex items-center gap-1">
        <FiChevronLeft className="text-lg" /> Prev
      </a>
    );
  }
  if (type === "next") {
    return (
      <a className="flex items-center gap-1">
        Next <FiChevronRight className="text-lg" />
      </a>
    );
  }
  return originalElement;
};

const CustomPagination = ({ meta, setParams }: TPagination) => {
  // const onChange: PaginationProps["onChange"] = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  return (
    <div className="flex items-center justify-center">
      <Pagination
        total={meta?.total}
        pageSize={meta?.limit}
        defaultCurrent={1}
        itemRender={itemRender}
        // onChange={onChange}
        onChange={(page) =>
          setParams((prev: Record<string, unknown>[]) => [
            ...prev.filter((param) => param.name !== "page"),
            { name: "page", value: page },
          ])
        }
      />
    </div>
  );
};

export default CustomPagination;
