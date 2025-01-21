"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TMenu } from "@/types/menu.type";
import { useGetUserQuery } from "@/redux/features/user/userApi";

const Menu = ({ items }: { items: TMenu[] }) => {
  const currentSlug = usePathname();
  const [activeMenu, setActiveMenu] = useState(currentSlug);

  const { data, refetch } = useGetUserQuery(undefined);

  const getMenuItemsByRole = (role: string) => {
    if (role === "superAdmin") {
      return items;
    }

    return items.filter((item) => item.roles.includes(role));
  };

  const filteredMenu = getMenuItemsByRole(data?.data?.role || "teacher");

  useEffect(() => {
    refetch();
  }, [data?.data?.role, refetch]);

  return (
    <div className="pt-4 flex flex-wrap justify-start items-center gap-5">
      {filteredMenu.map((item) => (
        <Link
          href={item?.slug}
          key={item?.slug}
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
