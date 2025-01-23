import { useGetUserQuery } from "@/redux/features/user/userApi";
import React from "react";

const CoordinatorDashboard = () => {
  const { data: userInfo } = useGetUserQuery(undefined);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
      <div className="col-span-3 bg-secondary/10 border border-secondary/30 rounded-xl px-5 pt-12 pb-5">
        <h4 className="text-2xl">Welcome back!</h4>
        <h2 className="text-3xl font-bold mb-1">
          {userInfo?.data?.first_name || "User"}{" "}
          {userInfo?.data?.last_name || "Name"}
        </h2>
        <p className="text-base">It&apos;s great to see you again!</p>
        {/* <h3 className="text-4xl font-bold">1523</h3> */}
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
