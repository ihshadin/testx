"use client";
import React, { useState } from "react";
import { message, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const DatabaseManagementPage = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file as FileType);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch("https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto py-8 px-2 ">
        {/* <h4 className="text-2xl lg:text-3xl font-bold">Database Management</h4> */}
        <div className="flex flex-col md:flex-row justify-between md:items-end bg-secondary/10 border border-secondary/30 rounded-xl px-5 pt-12 pb-5 mb-5">
          <div className="justify-start items-center rounded-xl">
            <h6 className="text-base md:text-xl text-myColor mb-1 md:mb-2 font-archivo">
              Database Management
            </h6>
            <h4 className="text-2xl lg:text-4xl font-bold">
              Mastering the Art of Database Management
            </h4>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-5">
          <div className="bg-secondary/10 shadow-sm rounded-xl border-1 overflow-hidden">
            <h4 className="font-semibold text-xl leading-6 py-2.5 px-4 bg-secondary/80">
              Upload Database
            </h4>
            <div className="px-4 pt-2 pb-4 flex flex-col gap-3">
              <Upload className="*:!block" {...props}>
                <div className="border border-primary/20 py-2 px-4 rounded-lg cursor-pointer">
                  <h5 className="text-lg font-semibold">Choose File</h5>
                  <p className="text-accent/80">
                    Only .xlsx and .xls files are supported
                  </p>
                </div>
              </Upload>
              <button
                className="disabled:cursor-not-allowed bg-transparent hover:bg-primary disabled:bg-primary/10 text-accent hover:text-white disabled:text-accent/50 border border-primary/30 hover:border-primary disabled:border-primary/10 px-4 py-2 rounded-lg transition-all duration-150"
                onClick={handleUpload}
                disabled={fileList.length === 0}
              >
                {uploading ? "Uploading" : "Confirm Upload"}
              </button>
            </div>
          </div>
          <div className="bg-secondary/10 shadow-sm rounded-xl border-1 overflow-hidden">
            <h4 className="font-semibold text-xl leading-6 py-2.5 px-4 bg-secondary/80">
              Export Database
            </h4>
            <div className="px-4 pt-2 pb-4 flex flex-col gap-3">
              <div className="border border-primary/20 py-2 px-4 rounded-lg">
                <h5 className="text-lg font-semibold">Export Questions</h5>
                <p className="text-accent/80">
                  Download all questions as an Excel file
                </p>
              </div>
              <button className="disabled:cursor-not-allowed bg-transparent hover:bg-primary disabled:bg-primary/10 text-accent hover:text-white disabled:text-accent/50 border border-primary/30 hover:border-primary disabled:border-primary/10 px-4 py-2 rounded-lg transition-all duration-150">
                Expert to Excel
              </button>
            </div>
          </div>
          <div className="bg-rose-500/10 shadow-sm rounded-xl border-1 overflow-hidden col-span-2">
            <h4 className="font-semibold text-xl leading-6 py-2.5 px-4 bg-rose-500/80 text-white">
              Danger Zone
            </h4>
            <div className="px-4 pt-2 pb-4 flex items-center gap-3">
              <div className="grow">
                <h5 className="text-lg font-semibold">Delete All Questions</h5>
                <p className="text-accent/80">
                  This will permanently delete all questions from the database.
                </p>
              </div>
              <button className="bg-transparent hover:bg-rose-500 text-accent hover:text-white border border-rose-500/30 hover:border-rose-500 px-4 py-2 rounded-lg transition-all duration-150">
                Delete All Questions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DatabaseManagementPage;
