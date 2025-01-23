"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TMenu } from "@/types/menu.type";
import { useAppSelector } from "@/redux/hooks";
import { useSelectCurrentUser } from "@/redux/features/auth/authSlice";

const Menu = ({ items }: { items: TMenu[] }) => {
  const currentSlug = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(currentSlug);
  const user = useAppSelector(useSelectCurrentUser);

  const getMenuItemsByRole = (role: string) => {
    if (role === "superAdmin") {
      return items;
    }

    return items.filter((item) => item.roles.includes(role));
  };
  const filteredMenu = getMenuItemsByRole(user?.role || "teacher");

  if (user && user?.status === "pending") {
    return null;
  }

  return (
    <div className="pt-4 flex flex-wrap justify-start items-center gap-5">
      {filteredMenu.map((item, index) => (
        <Link
          key={index}
          href={item?.slug}
          onClick={() => setActiveMenu(item?.slug)}
          className={`bg-white hover:bg-primary/5 text-primary border border-primary/30 hover:border-primary/60 px-3 py-1 rounded-lg transition duration-150 ${
            activeMenu === item?.slug && "!bg-primary/5 !border-primary/60"
          }`}
        >
          {item?.label}
        </Link>
      ))}
    </div>
  );
};

export default Menu;
