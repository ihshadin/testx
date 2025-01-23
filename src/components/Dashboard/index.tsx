"use client";
import React from "react";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";
import CoordinatorDashboard from "./CoordinatorDashboard";
import LoadingComponent from "@/utils/Loading";
import { useAppSelector } from "@/redux/hooks";
import { useSelectCurrentUser } from "@/redux/features/auth/authSlice";
import PendingUserDashboard from "../PendingUser/Index";

const DashboardContainer = () => {
  const user = useAppSelector(useSelectCurrentUser);

  if (!user) return <LoadingComponent />;

  if (user && user?.status === "pending") {
    return <PendingUserDashboard />;
  }

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "superAdmin":
      return <AdminDashboard />;
    case "teacher":
      return <TeacherDashboard />;
    case "coordinator":
      return <CoordinatorDashboard />;
    default:
      return <LoadingComponent />; // Handle unknown roles
  }
};

export default DashboardContainer;
