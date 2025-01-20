"use client";
import React from "react";
import Link from "next/link";
import { useGetMetaDataQuery } from "@/redux/features/meta/metaApi";
import { useGetUserQuery } from "@/redux/features/user/userApi";

const AdminDashboard = () => {
  const { data: metaData } = useGetMetaDataQuery(undefined);
  const { data: userInfo } = useGetUserQuery(undefined);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
      <div className="col-span-3 bg-secondary/10 border border-secondary/30 rounded-xl px-5 pt-12 pb-5">
        <h4 className="text-2xl">Welcome back!</h4>
        <h4 className="text-3xl font-bold mb-1">
          {userInfo?.data?.first_name + " " + userInfo?.data?.last_name}
        </h4>
        <p className="text-base">It&apos;s great to see you again!</p>
        {/* <h3 className="text-4xl font-bold">1523</h3> */}
      </div>
      <div className="col-span-3 flex gap-5">
        <Link
          href={"/question/add-question"}
          className={`bg-white hover:bg-primary/5 text-primary border border-primary/30 hover:border-primary/60 px-4 py-2 rounded-xl transition duration-150`}
        >
          Add Question
        </Link>
        <Link
          href={"/course/add-course"}
          className={`bg-white hover:bg-primary/5 text-primary border border-primary/30 hover:border-primary/60 px-4 py-2 rounded-xl transition duration-150`}
        >
          Add Course
        </Link>
        <Link
          href={"/subject/add-subject"}
          className={`bg-white hover:bg-primary/5 text-primary border border-primary/30 hover:border-primary/60 px-4 py-2 rounded-xl transition duration-150`}
        >
          Add Subject
        </Link>
        <Link
          href={"/topic/add-topic"}
          className={`bg-white hover:bg-primary/5 text-primary border border-primary/30 hover:border-primary/60 px-4 py-2 rounded-xl transition duration-150`}
        >
          Add Topic
        </Link>
      </div>
      <div className="row-span-2 bg-secondary/10 border border-secondary/30 rounded-xl px-5 py-8 flex flex-col items-center justify-center">
        <h4 className="text-2xl mb-1">Total Questions</h4>
        <h3 className="text-4xl font-bold">{metaData?.data?.totalQuestions}</h3>
      </div>
      <div className="col-span-2 bg-secondary/10 border border-secondary/30 rounded-xl px-5 py-7 *:text-center">
        <h4 className="text-2xl mb-1">Unassign Questions</h4>
        <h3 className="text-4xl font-bold">
          {metaData?.data?.unassignQuestions}
        </h3>
      </div>
      <div className="bg-secondary/10 border border-secondary/30 rounded-xl px-5 py-7 *:text-center">
        <h4 className="text-2xl mb-1">Assign Questions</h4>
        <h3 className="text-4xl font-bold">
          {metaData?.data?.assignQuestions}
        </h3>
      </div>
      <div className="bg-secondary/10 border border-secondary/30 rounded-xl px-5 py-7 *:text-center">
        <h4 className="text-2xl mb-1">Completed Questions</h4>
        <h3 className="text-4xl font-bold">
          {metaData?.data?.completedQuestion}
        </h3>
      </div>
      <div className="col-span-2 bg-secondary/10 border border-secondary/30 rounded-xl px-5 py-7 *:text-center">
        <h4 className="text-2xl mb-1">Total Teachers</h4>
        <h3 className="text-4xl font-bold">{metaData?.data?.totalTeachers}</h3>
      </div>
      <div className="bg-secondary/10 border border-secondary/30 rounded-xl px-5 py-7 *:text-center">
        <h4 className="text-2xl mb-1">Total Coordinator</h4>
        <h3 className="text-4xl font-bold">
          {metaData?.data?.totalCoordinators}
        </h3>
      </div>
    </div>
  );
};

export default AdminDashboard;
