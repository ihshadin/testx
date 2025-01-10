import React from "react";
import logo from "@/assets/sites/logo.png";
import Image from "next/image";
import MenuItems from "./MenuItems";

const Header = () => {
  return (
    <header>
      <div className="max-w-7xl mx-auto py-3 px-2">
        <div className="flex justify-between items-center">
          <div>
            <Image className="inline-block w-48" src={logo} alt="img" />
          </div>
          <div>
            <button
              // onClick={() => setActiveTab(tabItem?.key)}
              className={`bg-white hover:bg-primary/5 text-primary border border-primary/30 hover:border-primary/60 px-5 py-1.5 rounded-xl transition duration-150`}
            >
              Logout
            </button>
          </div>
        </div>
        <MenuItems />
      </div>
    </header>
  );
};

export default Header;
