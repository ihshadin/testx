import AllUsersList from "@/components/Users";
import FilterUsers from "@/components/Users/FilterUsers";
import React from "react";

const UserManagementPage = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto py-8 px-2 ">
        {/* <h4 className="text-2xl lg:text-3xl font-bold">Database Management</h4> */}
        {/* <div className="flex flex-col md:flex-row justify-between md:items-end bg-secondary/10 border border-secondary/30 rounded-xl px-5 pt-12 pb-5 mb-5">
          <div className="justify-start items-center rounded-xl">
            <h6 className="text-base md:text-xl text-myColor mb-1 md:mb-2 font-archivo">
              Users Management
            </h6>
            <h4 className="text-2xl lg:text-4xl font-bold">
              Empowering Seamless User Management
            </h4>
          </div>
        </div> */}
        <div>
          <FilterUsers />
        </div>
        <div className="mt-10">
          <AllUsersList />
        </div>
      </div>
    </section>
  );
};

export default UserManagementPage;
