"use client";
import React, { useState } from "react";
import UploadImageWithPreview from "@/utils/UploadImage/UploadImageWithPreview";
import { Checkbox, Image, Select, Switch } from "antd";
import QuestionEdit from "@/components/Questions/QuestionEdit";
import { useParams } from "next/navigation";
import { useGetSingleQuestionQuery } from "@/redux/features/question/questionApi";
import MDEditor from "@uiw/react-md-editor";
import { mapToOptions } from "@/utils";
import { useGetAllUserQuery } from "@/redux/features/user/userApi";
import { CheckboxChangeEventTarget } from "antd/es/checkbox/Checkbox";

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
  const [file, setFile] = useState([]);
  const [isImageRequired, setIsImageRequired] = useState(false);
  const [isNeedHelp, setIsNeedHelp] = useState(false);
  const [isHold, setIsHold] = useState(false);

  const { data: question, isLoading } = useGetSingleQuestionQuery(id);
  const { data: teachers, isLoading: isTeaLoading } = useGetAllUserQuery([
    { name: "role", value: "teacher" },
    { name: "status", value: "approved" },
  ]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-2 text-center">
        <p className="text-primary text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <section>
      <div className="max-w-7xl mx-auto py-8 px-2">
        <h3 className="text-xl font-semibold mb-4">
          <span className="mr-2 font-medium">Q. Title: </span>
          {question?.data?.title}
        </h3>
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
                <UploadImageWithPreview setFile={setFile} />
              </div>
              <div className="grow">
                <button
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
              <MDEditor.Markdown source={question?.data?.desc} />
            </div>
          </div>
          <div className="w-[50%] border border-primary/10 rounded-lg px-3 py-3">
            <QuestionEdit question={question?.data} />
          </div>
        </div>

        <div className="mt-5 border border-primary/10 rounded-lg px-3 py-3">
          <div className="flex gap-4 *:border *:border-primary/10 *:rounded-lg *:px-5 *:py-2">
            <div>
              <p className="font-medium">Difficulty Level</p>
              <p>Medium</p>
            </div>
            <div>
              <p className="font-medium">Domain</p>
              <p>Information and Ideas</p>
            </div>
            <div>
              <p className="font-medium">Question Status</p>
              <p>Assigned</p>
            </div>
            <div>
              <p className="font-medium">Assigned Teacher</p>
              <p>Imam Hossain</p>
            </div>
            <div>
              <p className="font-medium">Question Owner</p>
              <p>Ahswin</p>
            </div>
          </div>
          <div className="mt-10">
            <Checkbox
              onChange={(e): any => setIsHold(e.target.checked)}
              defaultChecked={isHold}
              className="!text-lg"
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
              disabled={!isHold}
            >
              Hold Question
            </button>
          </div>
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
                  />
                </div>
                {isNeedHelp && (
                  <div className="flex gap-5 mt-3">
                    <Select
                      showSearch
                      mode="multiple"
                      placeholder="Select from here..."
                      options={mapToOptions(teachers?.data)}
                      className="[&_.ant-select-selector]:!min-h-10 !bg-transparent *:!rounded-lg w-[350px]"
                      onChange={() => setIsNeedHelp(false)}
                      disabled={!isNeedHelp}
                    />
                    <button
                      className="cursor-pointer disabled:cursor-not-allowed text-base font-medium bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
                      type="submit"
                      disabled={!isNeedHelp}
                    >
                      Assign Teacher
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-10 text-center">
                <button
                  className="cursor-pointer disabled:cursor-not-allowed text-base font-medium bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
                  type="submit"
                  // disabled={question?.data?.desc === question?.data?.newDesc}
                >
                  Submit Question
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuestionDetails;
