"use client";
import React, { useEffect, useState } from "react";
import { Checkbox, Select, Switch } from "antd";
import QuestionEdit from "@/components/Questions/QuestionEdit";
import { useParams } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "sonner";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import { TUser } from "@/types/user.type";
import {
  useGetSingleQuestionQuery,
  useUpdateQuestionMutation,
} from "@/redux/features/question/questionApi";
import { useGetAllUserQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { useSelectCurrentUser } from "@/redux/features/auth/authSlice";
import LoadingComponent from "@/utils/Loading";
import ImageUploadSection from "@/components/Questions/ImageUpload";
import ActionButtons from "@/components/Questions/ActionButtons";

const QuestionDetails = () => {
  const { id } = useParams();
  const user = useAppSelector(useSelectCurrentUser);
  const { data, isLoading, refetch } = useGetSingleQuestionQuery(id);
  const question = data?.data;
  const [isNeedHelp, setIsNeedHelp] = useState(false);
  const [reassignTeacher, setReassignTeacher] = useState("");
  const [isHold, setIsHold] = useState(
    question?.status == "hold" ? true : false
  );

  const { data: teachers } = useGetAllUserQuery([
    { name: "role", value: "teacher" },
    { name: "status", value: "approved" },
  ]);
  const [updateQuestion] = useUpdateQuestionMutation();

  const handleHoldStatus = async () => {
    const toastId = toast.loading("Updating question...");

    const status = question?.status == "hold" ? "assigned" : "hold";

    const updatedData = {
      id: id,
      data: { status: status },
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

  const handleReassignTeacher = async () => {
    const toastId = toast.loading("Updating question...");

    const updatedData = {
      id: id,
      data: { teacher: reassignTeacher, status: "reassigned" },
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

  const ownerEmail = question?.owner?.email;

  const fullName = (item: any) => {
    return item?.first_name + " " + item?.last_name;
  };

  const mapToOptions = (data: TUser[]) =>
    data?.map(({ _id, first_name, last_name }) => ({
      value: _id,
      label: first_name + " " + last_name,
    }));

  useEffect(() => {
    setIsHold(question?.status === "hold");
  }, [question?.status]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <section>
      <div className="max-w-7xl mx-auto py-8 px-2">
        <ImageUploadSection id={id} question={question} refetch={refetch} />

        <div className="flex gap-5 mt-5">
          <div className="w-[50%] border border-primary/10 rounded-lg px-3 py-3">
            {/* <div className="mt-3 flex flex-col gap-3">
              <div>
                <span className="bg-primary/10 h-5 w-5 text-sm inline-block mr-2 align-middle text-center rounded">
                  A
                </span>
                Native shrubs increase erosion levels over time.
              </div>
              <div>
                <span className="bg-primary/10 h-5 w-5 text-sm inline-block mr-2 align-middle text-center rounded">
                  B
                </span>
                Planting native shrubs has no effect on erosion.
              </div>
              <div>
                <span className="bg-primary/10 h-5 w-5 text-sm inline-block mr-2 align-middle text-center rounded">
                  C
                </span>
                Introducing native plants helps reduce riverbank erosion.
              </div>
              <div>
                <span className="bg-primary/10 h-5 w-5 text-sm inline-block mr-2 align-middle text-center rounded">
                  D
                </span>
                Restoring plant life makes soils more susceptible to flooding.
              </div>
            </div>
            <div className="mt-7">
              <p className="font-medium">Description</p>
              <p>
                In a recent study, researchers planted native shrubs along a
                riverbank. After one year, erosion levels dropped significantly.
                The team concluded that restoring native plant life can help
                stabilize riverbanks, reducing soil loss and improving long-term
                ecological health.
              </p>
            </div> */}
            <div data-color-mode="light">
              <MDEditor.Markdown source={question?.desc} />
            </div>
          </div>
          <div className="w-[50%] border border-primary/10 rounded-lg px-3 py-3">
            <QuestionEdit question={question} />
          </div>
        </div>

        <div className="mt-5 border border-primary/10 rounded-lg px-3 py-3">
          <div className="flex gap-4 *:border *:border-primary/10 *:rounded-lg *:px-5 *:py-2">
            {question?.difficulty_level && (
              <div>
                <p className="font-medium">Difficulty Level</p>
                <p className="capitalize">{question?.difficulty_level}</p>
              </div>
            )}
            {question?.domain && (
              <div>
                <p className="font-medium">Domain</p>
                <p className="capitalize">{question?.domain}</p>
              </div>
            )}
            {question?.status && (
              <div>
                <p className="font-medium">Question Status</p>
                <p className="capitalize">{question?.status}</p>
              </div>
            )}
            {question?.teacher && (
              <div>
                <p className="font-medium">Assigned Teacher</p>
                <p className="capitalize">{fullName(question?.teacher)}</p>
              </div>
            )}
            {question?.owner && (
              <div>
                <p className="font-medium">Assigned Owner</p>
                <p className="capitalize">{fullName(question?.owner)}</p>
              </div>
            )}
          </div>
          {question?.status === "hold" ? (
            <div className="mt-10">
              <p>
                This is question is now{" "}
                <span className="py-0.5 px-1.5 bg-orange-100 text-orange-700 rounded">
                  Hold
                </span>
              </p>
              <button
                className="cursor-pointer disabled:cursor-not-allowed text-base block mt-3 font-medium bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
                type="submit"
                onClick={() => handleHoldStatus()}
                disabled={!isHold}
              >
                Release Question
              </button>
            </div>
          ) : (
            <div className="mt-10">
              <Checkbox
                onChange={(e): any => setIsHold(e.target.checked)}
                checked={isHold}
                className="!text-base"
                disabled={
                  question?.status == "approved" || user?.email !== ownerEmail
                }
              >
                I want to{" "}
                <span className="py-0.5 px-1.5 bg-orange-100 text-orange-700 rounded">
                  Hold
                </span>{" "}
                this question for now
              </Checkbox>
              <button
                className="cursor-pointer disabled:cursor-not-allowed text-base block mt-3 font-medium bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
                type="submit"
                onClick={() => handleHoldStatus()}
                disabled={!isHold}
              >
                Hold Question
              </button>
            </div>
          )}
          {isHold || (
            <>
              <div className="mt-10">
                <div className="text-2xl font-semibold flex items-center gap-5">
                  Do you need help from another Teacher?
                  <Switch
                    onChange={setIsNeedHelp}
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    defaultChecked={isNeedHelp}
                    disabled={user?.email === ownerEmail ? false : true}
                  />
                </div>
                {isNeedHelp && (
                  <div className="flex gap-5 mt-3">
                    <Select
                      showSearch
                      placeholder="Select from here..."
                      options={mapToOptions(teachers?.data)}
                      className="[&_.ant-select-selector]:!min-h-10 !h-10 !bg-transparent *:!rounded-lg w-[350px]"
                      onChange={(teacher) => setReassignTeacher(teacher)}
                      disabled={!isNeedHelp}
                    />
                    <button
                      className="cursor-pointer disabled:cursor-not-allowed text-base font-medium bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
                      type="submit"
                      onClick={() => handleReassignTeacher()}
                      disabled={!isNeedHelp}
                    >
                      Reassign Teacher
                    </button>
                  </div>
                )}
              </div>
              <ActionButtons id={id} question={question} refetch={refetch} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuestionDetails;
