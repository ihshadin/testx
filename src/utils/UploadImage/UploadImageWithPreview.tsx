import { useEffect, useState } from "react";
import { GetProp, Upload, UploadFile, UploadProps, message } from "antd";
import { TUploadImage } from "@/types/uploadImg.type";
import { IoCloudUploadOutline } from "react-icons/io5";

const UploadImageWithPreview = ({ files, setFile }: TUploadImage) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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

  return (
    <>
      <div className="flex items-center gap-5 upload-image-circle">
        <Upload
          {...props}
          listType="picture-card"
          prefixCls=""
          maxCount={10}
          multiple
          fileList={files}
        >
          <button style={{ border: 0, background: "none" }} type="button">
            <IoCloudUploadOutline className="text-xl text-center mx-auto" />
            <div className="mt-1 text-base">Upload</div>
          </button>
        </Upload>
      </div>
    </>
  );
};

export default UploadImageWithPreview;
