import { useState } from "react";
import {
  useDeleteImageMutation,
  useUpdateImageMutation,
} from "@/redux/features/question/image";
import { toast } from "sonner";
import { uploadImageInCloudinary } from "@/utils/UploadImage/UploadImageInCloudinay";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import { Image, Input, Switch } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import UploadImageWithPreview from "@/utils/UploadImage/UploadImageWithPreview";

const ImageUploadSection = ({ id, question, refetch }: any) => {
  const [files, setFiles] = useState([]);
  const [isImageRequired, setIsImageRequired] = useState(
    question?.images.length > 0
  );
  const [link, setLink] = useState("");
  const [activeTab, setActiveTab] = useState("image");

  const [updateImage] = useUpdateImageMutation();
  const [deleteImage] = useDeleteImageMutation();

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one image to upload.");
      return;
    }

    const toastId = toast.loading("Uploading images...");

    try {
      const uploadPromises = files.map(
        async (file) => await uploadImageInCloudinary(file)
      );
      const uploadedImages = await Promise.all(uploadPromises);

      const successfulUploads = uploadedImages.filter((url) => url);

      if (successfulUploads.length === 0)
        toast.error("image upload failed", { id: toastId });

      const updatedData = {
        id: id,
        data: successfulUploads,
      };

      const res = await updateImage(updatedData).unwrap();
      if (res?.success) {
        toast.success("image(s) uploaded successfully", { id: toastId });
        setFiles([]);
        refetch();
      }
    } catch (error) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  const handleSubmitLinks = async () => {
    const toastId = toast.loading("Uploading images...");

    try {
      const successfulUploads = [link];

      if (successfulUploads.length === 0)
        toast.error("image upload failed", { id: toastId });

      const updatedData = {
        id: id,
        data: successfulUploads,
      };

      const res = await updateImage(updatedData).unwrap();
      if (res?.success) {
        toast.success("image(s) uploaded successfully", { id: toastId });
        setFiles([]);
        refetch();
      }
    } catch (error) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  const handleImageDelete = async (url: string) => {
    const toastId = toast.loading("Question Deleting...");

    const deleteData = { id, url };
    try {
      await deleteImage(deleteData).unwrap();
      toast.success("Question Delete Successful", { id: toastId });
      refetch();
    } catch (error) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  return (
    <>
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
          <div>
            <div className="flex gap-2 mb-5">
              <button
                onClick={() => setActiveTab("image")}
                className={`cursor-pointer text-base font-medium bg-primary/5 hover:bg-primary/15 text-primary/70 hover:text-primary/80 border border-primary/10 hover:border-primary/60 px-3 py-1 rounded-lg transition duration-150 ${
                  activeTab === "image" &&
                  "!bg-primary/15 text-primary/80 border-primary/60"
                }`}
                type="submit"
              >
                Images Upload
              </button>
              <button
                onClick={() => setActiveTab("link")}
                className={`cursor-pointer text-base font-medium bg-primary/5 hover:bg-primary/15 text-primary/70 hover:text-primary/80 border border-primary/10 hover:border-primary/60 px-3 py-1 rounded-lg transition duration-150 ${
                  activeTab === "link" &&
                  "!bg-primary/15 text-primary/80 border-primary/60"
                }`}
                type="submit"
              >
                Submit Links
              </button>
            </div>
            {activeTab === "image" && (
              <div className="flex items-end gap-5">
                <div className="shrink">
                  <UploadImageWithPreview files={files} setFile={setFiles} />
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
            )}
            {activeTab === "link" && (
              <div className="flex flex-row gap-2 w-2/3">
                <Input
                  onChange={(e) => setLink(e?.target?.value)}
                  placeholder="Add Image Link"
                  size="large"
                  className="grow-0"
                />
                <button
                  onClick={handleSubmitLinks}
                  className="shrink-0 cursor-pointer text-base font-medium bg-primary/5 hover:bg-primary text-primary hover:text-white border border-primary/30 hover:border-primary/60 px-5 py-2 rounded-xl transition duration-150"
                  type="submit"
                >
                  Submit The Link
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-5">
            {question?.images?.map((image: string) => (
              <div
                key={image}
                className="rounded-xl overflow-hidden flex flex-col"
              >
                <Image src={image} alt="Image" className="!h-[200px] w-auto" />
                <button
                  onClick={() => handleImageDelete(image)}
                  className="bg-red-100 px-2 py-2 text-center"
                >
                  <AiOutlineDelete className="mx-auto text-lg" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUploadSection;
