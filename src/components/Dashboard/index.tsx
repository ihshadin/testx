"use client";
import React from "react";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";
import CoordinatorDashboard from "./CoordinatorDashboard";

const DashboardContainer = () => {
  const { data, refetch } = useGetUserQuery(undefined);

  const user = useSelector((state: any) => data?.data);

  if (!user) return <div>Loading...</div>;

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "teacher":
      return <TeacherDashboard />;
    case "coordinator":
      return <CoordinatorDashboard />;
    default:
      return <div>Unauthorized</div>; // Handle unknown roles
  }
};

export default DashboardContainer;
