"use client";
import React, { useEffect, useState } from "react";
import UploadImageWithPreview from "@/utils/UploadImage/UploadImageWithPreview";
import { Checkbox, Image, Popconfirm, Select, Switch } from "antd";
import QuestionEdit from "@/components/Questions/QuestionEdit";
import { useParams, useRouter } from "next/navigation";
import {
  useGetSingleQuestionQuery,
  useUpdateQuestionMutation,
} from "@/redux/features/question/questionApi";
import MDEditor from "@uiw/react-md-editor";
// import { mapToOptions } from "@/utils";
import {
  useGetAllUserQuery,
  useGetUserQuery,
} from "@/redux/features/user/userApi";
import { CheckboxChangeEventTarget } from "antd/es/checkbox/Checkbox";
import { toast } from "sonner";
import { uploadImageInCloudinary } from "@/utils/UploadImage/UploadImageInCloudinay";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import { TUser } from "@/types/user.type";

const galleryImages = [
  {
    _id: "1",
    url: "https://images.pexels.com/photos/20263436/pexels-photo-20263436/free-photo-of-revel-atlantic-city-hotel-in-atlantic-city-in-usa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    _id: "2",
    url: "https://images.pexels.com/photos/28295577/pexels-photo-28295577/free-photo-of-sunday-morning.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    _id: "3",
    url: "https://images.pexels.com/photos/13828941/pexels-photo-13828941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    _id: "4",
    url: "https://images.pexels.com/photos/29971353/pexels-photo-29971353/free-photo-of-serene-woodland-scene-in-english-forest.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    _id: "5",
    url: "https://images.pexels.com/photos/30135170/pexels-photo-30135170/free-photo-of-mystical-forest-in-madeira-with-sunlit-moss.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  // {
  //   _id: "6",
  //   url: "https://images.pexels.com/photos/27906872/pexels-photo-27906872/free-photo-of-a-bird-flying-over-the-ocean-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  // },
];

const QuestionDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: user } = useGetUserQuery(undefined);
  const { data, isLoading, refetch } = useGetSingleQuestionQuery(id);
  const question = data?.data;

  const [files, setFiles] = useState([]);
  const [isImageRequired, setIsImageRequired] = useState(false);
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
  console.log(user);
  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one image to upload.");
      return;
    }

    const toastId = toast("Uploading images...");

    try {
      const uploadPromises = files.map((file) => uploadImageInCloudinary(file));
      const uploadedImages = await Promise.all(uploadPromises);

      console.log("Uploaded Image URL--=>", uploadedImages);
      const successfulUploads = uploadedImages.filter((url) => url); // Filter out failed uploads

      toast.success(
        `${successfulUploads.length} image(s) uploaded successfully.`,
        { id: toastId }
      );

      console.log("Uploaded Image URLs:", successfulUploads);
      setFiles([]);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images. Please try again.", {
        id: toastId,
      });
    }
  };

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

  const handleActionAsOnlyTeacher = async () => {
    const toastId = toast.loading("Updating question...");
    const updatedData = {
      id: id,
      data: { status: "assigned", teacher: question?.owner?._id },
    };
    console.log("updated data", updatedData);

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

  const teacherEmail = question?.teacher?.email;
  const ownerEmail = question?.owner?.email;
  const loggedInEmail = user?.data?.email;

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
  }, [question]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-2">
        <p className="text-primary text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <section>
      <div className="max-w-7xl mx-auto py-8 px-2">
        <div className="text-2xl font-semibold flex items-center gap-5">
          Is Image is required?
          <Switch
            onChange={setIsImageRequired}
            checkedChildren="Yes"
            unCheckedChildren="No"
            defaultChecked={isImageRequired}
          />
        </div>
        {isImageRequired && (
          <div className="mt-6">
            <div className="flex items-end gap-5">
              <div className="shrink">
                <UploadImageWithPreview setFile={setFiles} />
              </div>
              <div className="grow">
                <button
                  onClick={handleUpload}
                  className="cursor-pointer text-base font-medium ml-auto bg-primary/5 hover:bg-primary text-primary hover:text-white border border-primary/30 hover:border-primary/60 px-5 py-2 rounded-xl transition duration-150"
                  type="submit"
                >
                  Upload Images
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-5">
              {galleryImages.map((image) => (
                <div key={image?._id} className="rounded-xl overflow-hidden">
                  <Image
                    src={image?.url}
                    alt="Image"
                    className="!h-[200px] w-auto rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

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
                    disabled={loggedInEmail === ownerEmail ? false : true}
                  />
                </div>
                {isNeedHelp && (
                  <div className="flex gap-5 mt-3">
                    <Select
                      showSearch
                      placeholder="Select from here..."
                      options={mapToOptions(teachers?.data)}
                      className="[&_.ant-select-selector]:!min-h-10 !bg-transparent *:!rounded-lg w-[350px]"
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

              {/* <div className="mt-10 text-center">
                <button
                  className="cursor-pointer disabled:cursor-not-allowed text-base font-medium bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
                  type="submit"
                  // disabled={question?.desc === question?.newDesc}
                >
                  Submit Question For Verify
                </button>
              </div> */}
              <div className="mt-10 text-center">
                {teacherEmail == ownerEmail ? (
                  // Case 1: Teacher and Owner are the same
                  <Popconfirm
                    title="Verify Question"
                    description="Are you sure to send for Approval"
                    // placement="topRight"
                    onConfirm={() => handleActionAsOwner()}
                    okText="Yes"
                    cancelText="No"
                  >
                    <button className="cursor-pointer disabled:cursor-not-allowed text-base font-medium bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150">
                      Submit the Question for Approval
                    </button>
                  </Popconfirm>
                ) : loggedInEmail === ownerEmail &&
                  loggedInEmail !== teacherEmail ? (
                  // Case 2: Logged-in user is the owner but not the teacher
                  <p className="text-lg text-red-600 text-center">
                    This is a reassigned question. Teacher is{" "}
                    <span className="font-bold">
                      {fullName(question?.teacher)}
                    </span>
                    .
                  </p>
                ) : (loggedInEmail === teacherEmail) !== ownerEmail ? (
                  // Case 3: Logged-in user is the teacher
                  <Popconfirm
                    title="Submit Question"
                    description="Are you sure to send the owner"
                    // placement="topRight"
                    onConfirm={() => handleActionAsOnlyTeacher()}
                    okText="Yes"
                    cancelText="No"
                  >
                    <button className="cursor-pointer disabled:cursor-not-allowed text-base font-medium bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150">
                      Submit the Question to the Owner
                    </button>
                  </Popconfirm>
                ) : (
                  // Default case: No actions available
                  <p className="text-base text-gray-500">
                    No actions available.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuestionDetails;
