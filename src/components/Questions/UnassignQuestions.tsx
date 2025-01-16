"use client";
import { useState } from "react";
import { Col, Form, Row, Select, Table } from "antd";
import { toast } from "sonner";
import { getUnassignColumns } from "@/utils/AntdTableColumn/TableColumns";
import { TableRowSelection } from "antd/es/table/interface";

const data = [
  {
    key: "1",
    question_id: "Q101",
    question_name: "What is React?",
    question_desc: "Explain the fundamental concepts of React.js.",
    course: "Web Development",
    subject: "Frontend Frameworks",
    topic: "React Basics",
    status: "unassign",
    action: "",
  },
  {
    key: "2",
    question_id: "Q102",
    question_name: "What is Redux?",
    question_desc: "Describe the principles of Redux and its architecture.",
    course: "Web Development",
    subject: "State Management",
    topic: "Redux Concepts",
    status: "assign",
    action: "",
  },
  {
    key: "3",
    question_id: "Q103",
    question_name: "What is JavaScript?",
    question_desc: "Provide an overview of JavaScript and its features.",
    course: "Programming",
    subject: "Core Programming",
    topic: "JavaScript Introduction",
    status: "assign",
    action: "",
  },
  {
    key: "4",
    question_id: "Q104",
    question_name: "What is CSS?",
    question_desc: "Discuss CSS and its role in web development.",
    course: "Web Design",
    subject: "Styling",
    topic: "CSS Basics",
    status: "unassign",
    action: "",
  },
  {
    key: "5",
    question_id: "Q105",
    question_name: "What are APIs?",
    question_desc: "Explain APIs and their importance in software development.",
    course: "Backend Development",
    subject: "API Design",
    topic: "API Basics",
    status: "unassign",
    action: "",
  },
];

const UnassignQuestions = () => {
  // TODO: type any fix
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [form] = Form.useForm();

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  //   console.log(selectedRowKeys);
  const hasSelected = selectedRowKeys.length > 0;

  // Delete Appointment
  const handleDelete = async (id: string) => {
    // const toastId = toast.loading("Appointment Deleting...");
    // try {
    //   const res = await deleteAppointment(id).unwrap();
    //   res && toast.success("Appointment Delete Successful", { id: toastId });
    // } catch (error) {
    //   //   onsubmitErrorHandler(error, toastId);
    // }
  };

  // Update Status
  const handleUpdateStatus = async (status: string, id: string) => {
    // if (status === "visited") {
    //   // Open add fee modal when status is "visited"
    //   setIsFeeModalVisible(true);
    //   setCurrentAddFeeID(id);
    // } else {
    //   // Update when status is not "visited"
    //   const toastId = toast.loading("Status Updating...");
    //   try {
    //     const payload = {
    //       id,
    //       data: { status },
    //     };
    //     const res = await updateAppointmentStatus(payload).unwrap();
    //     res && toast.success("Status updated successfully", { id: toastId });
    //   } catch (error) {
    //     onsubmitErrorHandler(error, toastId);
    //   }
    // }
  };

  const columns = getUnassignColumns({
    handleUpdateStatus,
    handleDelete,
  });

  const result = data;

  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
  };

  const teachers = [
    { _id: "1", label: "IH Shadin" },
    { _id: "2", label: "Sakhawat" },
    { _id: "3", label: "Ariful Islam" },
  ];

  const mapToOptions = (data: any) =>
    data.map(({ _id, label }: any) => ({ value: _id, label }));

  return (
    <>
      {/* <div className="mb-3">
        <button
          className="cursor-pointer disabled:cursor-not-allowed text-base font-medium block bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
          type="submit"
          disabled={selectedRowKeys.length > 0 ? false : true}
        >
          Assignment Question to the Teacher
        </button>
      </div> */}
      <div className="mb-3">
        <Form
          form={form}
          onFinish={onSubmit}
          requiredMark={false}
          layout="vertical"
        >
          <Row gutter={15} align="bottom">
            <Col span={10}>
              <Form.Item
                label="Teacher"
                name="teacher"
                style={{ marginBottom: 0 }}
              >
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select from here..."
                  options={mapToOptions(teachers)}
                  className="!h-10 !bg-transparent *:!rounded-lg "
                  onChange={() => setIsBtnDisabled(false)}
                  disabled={selectedRowKeys.length > 0 ? false : true}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <div>
                <button
                  className="cursor-pointer disabled:cursor-not-allowed text-base font-medium block w-full bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
                  type="submit"
                  disabled={isBtnDisabled || selectedRowKeys.length === 0}
                >
                  Assign Teacher
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={result}
        scroll={{ x: 1500 }}
        pagination={false}
      />
    </>
  );
};

export default UnassignQuestions;
