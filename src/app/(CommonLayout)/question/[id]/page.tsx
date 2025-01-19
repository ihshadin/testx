"use client";
import React, { useState } from "react";
import UploadImageWithPreview from "@/utils/UploadImage/UploadImageWithPreview";
import { Image } from "antd";
import QuestionEdit from "@/components/Questions/QuestionEdit";
import { useParams } from "next/navigation";
import { useGetSingleQuestionQuery } from "@/redux/features/question/questionApi";

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

  const { data: question } = useGetSingleQuestionQuery(id);

  console.log("Doctor id", id);
  console.log("Doctor data", question?.data);

  return (
    <section>
      <div className="max-w-7xl mx-auto py-8 px-2">
        <div>
          <h6 className="text-xl mb-2 font-semibold">Image Gallery</h6>
          <UploadImageWithPreview setFile={setFile} />
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
        <div className="flex gap-5 mt-5">
          <div className="w-[45%] border border-primary/10 rounded-lg px-2 py-2">
            <h3 className="text-xl font-semibold">
              <span className="mr-2 font-bold text-[22px]">Q.</span>What is the
              main conclusion of the researchers’ study?
            </h3>
            <div className="mt-3 flex flex-col gap-3">
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
            </div>
            <div className="mt-7 flex gap-12">
              <div>
                <p className="font-medium">Difficulty Level</p>
                <p>Medium</p>
              </div>
              <div>
                <p className="font-medium">Domain</p>
                <p>Information and Ideas</p>
              </div>
            </div>
          </div>
          <div className="w-[55%] border border-primary/10 rounded-lg px-2 py-2">
            <QuestionEdit question={question?.data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionDetails;
