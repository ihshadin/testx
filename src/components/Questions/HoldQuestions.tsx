"use client";
import { useState } from "react";
import { Col, Form, Row, Select, Table } from "antd";
import { toast } from "sonner";
import { getHoldQuestionsColumns } from "@/utils/AntdTableColumn/TableColumns";
import { TableRowSelection } from "antd/es/table/interface";
import { TQuestion } from "@/types/question.type";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import { useUpdateQuestionsMutation } from "@/redux/features/question/questionApi";
import { useGetAllUserQuery } from "@/redux/features/user/userApi";
import { TUser } from "@/types/user.type";

type TQuestions = {
  questions: TQuestion[];
  isQuesLoading: boolean;
};

const HoldQuestions = ({ questions, isQuesLoading }: TQuestions) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [form] = Form.useForm();

  const { data: teachers, isLoading: isTeaLoading } = useGetAllUserQuery([
    { name: "role", value: "teacher" },
    { name: "status", value: "approved" },
  ]);
  const [updateQuestions] = useUpdateQuestionsMutation();

  // Row Selection functions
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const columns = getHoldQuestionsColumns({ meta: teachers?.meta });

  const handleAssignTeacher = async (data: any) => {
    const toastId = toast.loading("Assigning teacher...");

    const updatedData = {
      questionIds: selectedRowKeys,
      teacher: data?.teacher,
      owner: data?.teacher,
      status: "assigned",
    };

    try {
      const res = await updateQuestions(updatedData).unwrap();
      if (res?.success) {
        toast.success("Assigned updated successfully", { id: toastId });
        form.resetFields();
      }
    } catch (error: any) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  const mapToOptions = (data: TUser[]) =>
    data?.map(({ _id, first_name, last_name }) => ({
      value: _id,
      label: first_name + " " + last_name,
    }));

  return (
    <>
      <div className="mb-3">
        <Form
          form={form}
          onFinish={handleAssignTeacher}
          requiredMark={false}
          layout="vertical"
        >
          <Row gutter={15} align="bottom">
            <Col span={8}>
              <Form.Item
                label="Teacher"
                name="teacher"
                style={{ marginBottom: 0 }}
              >
                <Select
                  loading={isTeaLoading}
                  showSearch
                  placeholder="Select from here..."
                  options={mapToOptions(teachers?.data)}
                  className="!h-10 !bg-transparent *:!rounded-lg "
                  onChange={() => setIsBtnDisabled(false)}
                  disabled={selectedRowKeys.length <= 0}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <div>
                <button
                  className="cursor-pointer disabled:cursor-not-allowed text-base font-medium bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
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
        rowKey="_id"
        loading={isQuesLoading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={questions}
        scroll={{ x: 1500 }}
        pagination={false}
      />
    </>
  );
};

export default HoldQuestions;
