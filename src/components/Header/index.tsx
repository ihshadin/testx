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
    label: "Question Submission",
    slug: "/question/question-submission",
    roles: ["coordinator"],
  },
  {
    label: "Question Reassignment",
    slug: "/question-reassignment",
    roles: ["admin", "coordinator"],
  },
  // {
  //   label: "Database Management",
  //   slug: "/database-management",
  //   roles: ["admin", "coordinator"],
  // },
  {
    label: "Completed Questions",
    slug: "/completed-questions",
    roles: ["admin"],
  },
  // { label: "Questions From Teacher", slug: "/questions-from-teacher", roles: ["admin", "teacher"] },
  // { label: "Your Profile", slug: "/profile", roles: ["admin", "teacher", "coordinator"] },
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
