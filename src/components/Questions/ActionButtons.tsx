"use client";
import React from "react";
import { Popconfirm } from "antd";
import { useAppSelector } from "@/redux/hooks";
import { useSelectCurrentUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { useUpdateQuestionMutation } from "@/redux/features/question/questionApi";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import { useRouter } from "next/navigation";

const ActionButtons = ({ id, question, refetch }: any) => {
  const router = useRouter();
  const user = useAppSelector(useSelectCurrentUser);
  //   const { data, isLoading, refetch } = useGetSingleQuestionQuery(id);
  //   const question = data?.data;
  const [updateQuestion] = useUpdateQuestionMutation();

  const handleActionAsOnlyTeacher = async () => {
    const toastId = toast.loading("Updating question...");
    const updatedData = {
      id: id,
      data: { status: "assigned", teacher: question?.owner?._id },
    };

    try {
      const res = await updateQuestion(updatedData).unwrap();
      if (res?.success) {
        toast.success("Question updated successfully", { id: toastId });
        refetch();
      }
    } catch (error: any) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  const handleActionAsOwner = async () => {
    const toastId = toast.loading("Updating question...");

    const updatedData = {
      id: id,
      data: { status: "verified" },
    };

    try {
      const res = await updateQuestion(updatedData).unwrap();
      if (res?.success) {
        toast.success("Question updated successfully", { id: toastId });
        router.push("/");
      }
    } catch (error: any) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  const handleCoordinatorAction = async () => {
    const toastId = toast.loading("Updating question...");

    const updatedData = {
      id: id,
      data: { status: "approved" },
    };

    try {
      const res = await updateQuestion(updatedData).unwrap();
      if (res?.success) {
        toast.success("Question updated successfully", { id: toastId });
        refetch();
      }
    } catch (error: any) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  const fullName = (item: any) => {
    return item?.first_name + " " + item?.last_name;
  };

  const teacherEmail = question?.teacher?.email;
  const ownerEmail = question?.owner?.email;
  const loggedInEmail = user?.email;

  return (
    <>
      <div className="mt-10 text-center">
        {user?.role === "coordinator" ? (
          // If user is coordinator then he can only approved the
          <Popconfirm
            title="Submit Question"
            description="Are you sure to send the owner"
            onConfirm={() => handleCoordinatorAction()}
            okText="Yes"
            cancelText="No"
          >
            <button
              className="cursor-pointer disabled:cursor-not-allowed text-base font-medium bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
              disabled={question?.status == "approved"}
            >
              Approved the Question
            </button>
          </Popconfirm>
        ) : teacherEmail === loggedInEmail && ownerEmail === loggedInEmail ? (
          // Case 1: Teacher and Owner are the same
          <Popconfirm
            title="Verify Question"
            description="Are you sure to send for Approval"
            onConfirm={() => handleActionAsOwner()}
            okText="Yes"
            cancelText="No"
          >
            <button
              className="cursor-pointer disabled:cursor-not-allowed text-base font-medium bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
              disabled={question?.status == "approved"}
            >
              Submit the Question for Approval
            </button>
          </Popconfirm>
        ) : teacherEmail === loggedInEmail && ownerEmail !== loggedInEmail ? (
          // Case 3: Logged-in user is the teacher
          <Popconfirm
            title="Submit Question"
            description="Are you sure to send the owner"
            // placement="topRight"
            onConfirm={() => handleActionAsOnlyTeacher()}
            okText="Yes"
            cancelText="No"
          >
            <button
              className="cursor-pointer disabled:cursor-not-allowed text-base font-medium bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
              disabled={question?.status == "approved"}
            >
              Submit the Question to the Owner
            </button>
          </Popconfirm>
        ) : teacherEmail !== loggedInEmail && ownerEmail === loggedInEmail ? (
          // Case 2: Logged-in user is the owner but not the teacher
          <p className="text-lg text-red-600 text-center">
            This is a reassigned question. Teacher is{" "}
            <span className="font-bold">{fullName(question?.teacher)}</span>.
          </p>
        ) : (
          // Default case: No actions available
          <p className="text-base text-gray-500">No actions available.</p>
        )}
      </div>
    </>
  );
};

export default ActionButtons;
