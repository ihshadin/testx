import { useEffect, useState } from "react";
import { GetProp, Upload, UploadFile, UploadProps, message } from "antd";
import { TUploadImage } from "@/types/uploadImg.type";
import { IoCloudUploadOutline } from "react-icons/io5";

const UploadImageWithPreview = ({ file, setFile }: TUploadImage) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Sync with parent when `fileList` changes
  useEffect(() => {
    setFile(fileList);
  }, [fileList, setFile, file]);

  const props: UploadProps = {
    name: "file",
    fileList,
    onChange(info) {
      setFileList(info.fileList);
      setFile(info.fileList);

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        return null;
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove: () => {
      setFileList([]);
    },
    showUploadList: {
      extra: ({ size = 0 }) => (
        <span style={{ color: "#cccccc" }}>
          ({(size / 1024 / 1024).toFixed(2)}MB)
        </span>
      ),
      showPreviewIcon: false,
      showRemoveIcon: true,
      // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
    },
  };

  // const getBase64 = (file: FileType): Promise<string> =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result as string);
  //     reader.onerror = (error) => reject(error);
  //   });

  // const handlePreview = async (file: UploadFile) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj as FileType);
  //   }
  //   setPreviewImage(file.url || (file.preview as string));
  //   setPreviewOpen(true);
  // };

  // Sync with parent component when `files` is cleared
  // useEffect(() => {
  //   if (file.length === 0) {
  //     setFile([]); // Ensure the parent is updated as well
  //   }
  //   if (fileList.length === 0) {
  //     setFile([]); // Ensure the parent is updated as well
  //   }
  // }, [fileList, setFile, file]);

  return (
    <>
      <div className="flex items-center gap-5 upload-image-circle">
        {/* <ImgCrop
          rotationSlider
          fillColor="transparent"
          aspect={aspectRatio ? aspectRatio : 25 / 32}
        > */}
        <Upload
          {...props}
          listType="picture-card"
          // onPreview={handlePreview}
          prefixCls=""
          maxCount={10}
          multiple
        >
          <button style={{ border: 0, background: "none" }} type="button">
            <IoCloudUploadOutline className="text-xl text-center mx-auto" />
            <div className="mt-1 text-base">Upload</div>
          </button>
        </Upload>

        {/* </ImgCrop> */}
        <>
          {/* {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
              alt="Image Preview"
            />
          )} */}
        </>
      </div>
    </>
  );
};

export default UploadImageWithPreview;
