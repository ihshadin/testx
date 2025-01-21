"use client";
import React from "react";
import logo from "@/assets/sites/logo.png";
import Image from "next/image";
import Menu from "./Menu";
import LogOut from "../Auth/LogOut";

const menuItems = [
  { label: "Dashboard", slug: "/", roles: ["admin", "teacher", "coordinator"] },
  // {
  //   label: "Add Question",
  //   slug: "/add-question",
  //   roles: ["admin"],
  // },
  {
    label: "Question Assignment",
    slug: "/question/question-assignment",
    roles: ["admin"],
  },
  {
    label: "Users Management",
    slug: "/users-management",
    roles: ["admin"],
  },
  {
    label: "Coordinator Assignment",
    slug: "/coordinator-assignment",
    roles: ["admin"],
  },
  {
    label: "Question Reassignment",
    slug: "/question/question-reassignment",
    roles: ["admin"],
  },
  {
    label: "Question Reassignment",
    slug: "/question/coordinator-reassignment",
    roles: ["coordinator"],
  },
  {
    label: "Question Submission",
    slug: "/question/question-submission",
    roles: ["coordinator"],
  },
  {
    label: "Completed Questions",
    slug: "/question/question-completed",
    roles: ["admin"],
  },
  {
    label: "Hold Questions",
    slug: "/question/hold-question",
    roles: ["admin"],
  },
  {
    label: "Final Questions",
    slug: "/question/final-question",
    roles: ["admin"],
  },
  {
    label: "Add Question",
    slug: "/question/add-question",
    roles: ["admin"],
  },
  {
    label: "Add Course",
    slug: "/course/add-course",
    roles: ["admin"],
  },
  {
    label: "Add Subject",
    slug: "/subject/add-subject",
    roles: ["admin"],
  },
  {
    label: "Add Topic",
    slug: "/topic/add-topic",
    roles: ["admin"],
  },
];

const Header = () => {
  return (
    <header>
      <div className="max-w-7xl mx-auto py-3 px-2">
        <div className="flex justify-between items-center">
          <div>
            <Image className="inline-block w-48" src={logo} alt="img" />
          </div>
          <div>
            <LogOut />
          </div>
        </div>
        <Menu items={menuItems} />
      </div>
    </header>
  );
};

export default Header;
