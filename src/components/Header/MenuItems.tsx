"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Dashboard", slug: "/" },
  // { label: "Add Question", slug: "/add-question" },
  { label: "Question Assignment.", slug: "/question-assignment" },
  { label: "Users Management", slug: "/users-management" },
  { label: "Database Management", slug: "/database-management" },
  { label: "All Questions", slug: "/all-questions" },
  { label: "Questions From Teacher", slug: "/questions-from-teacher" },
  // { label: "Your Profile", slug: "/profile" },
];

const MenuItems = () => {
  const currentSlug = usePathname();
  const [activeMenu, setActiveMenu] = useState(currentSlug);

  return (
    <div className="pt-4 flex flex-wrap justify-between items-center">
      {menuItems.map((item) => (
        <Link
          href={item?.slug}
          key={item?.slug}
          onClick={() => setActiveMenu(item?.slug)}
          className={`bg-white hover:bg-primary/5 text-primary border border-primary/30 hover:border-primary/60 px-4 py-2 rounded-xl transition duration-150 ${
            activeMenu === item?.slug && "!bg-primary/5 !border-primary/60"
          }`}
        >
          {item?.label}
        </Link>
      ))}
    </div>
  );
};

export default MenuItems;
