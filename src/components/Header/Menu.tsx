"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TMenu } from "@/types/menu.type";

const Menu = ({ items }: { items: TMenu[] }) => {
  const currentSlug = usePathname();
  const [activeMenu, setActiveMenu] = useState(currentSlug);

  const getMenuItemsByRole = (role: string) => {
    if (role === "superAdmin") {
      return items;
    }

    return items.filter((item) => item.roles.includes(role));
  };

  const filteredMenu = getMenuItemsByRole("superAdmin");

  return (
    <div className="pt-4 flex flex-wrap justify-between items-center">
      {filteredMenu.map((item) => (
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

export default Menu;