"use client";
import React, { useState } from "react";
import { Checkbox, Col, Form, Input, Row, Select } from "antd";
import logo from "@/assets/sites/logo.png";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
import { mapToOptions } from "@/utils";
import { useGetAllSubjectQuery } from "@/redux/features/subject/subjectApi";
import { useUserRegisterRequestMutation } from "@/redux/features/auth/authApi";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import { TUser } from "@/types/user.type";
import { useGetUserQuery } from "@/redux/features/user/userApi";

const SignUpPage = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [selCourse, setSelCourse] = useState<string[]>([]);
  const [form] = Form.useForm();
  const router = useRouter();

  const { data: courses, isLoading: isCouLoading } =
    useGetAllCourseQuery(undefined);
  const { data: subjects, isLoading: isSubLoading } = useGetAllSubjectQuery([
    { name: "course", value: selCourse },
  ]);
  const [register, { isLoading }] = useUserRegisterRequestMutation();
  const { data, refetch } = useGetUserQuery(undefined);

  const handleCourseChange = (courseId: string[]) => {
    form.setFieldsValue({ subject: undefined });
    setSelCourse(courseId);
  };

  const onSubmit = async (data: TUser & { agreement: boolean }) => {
    const toastId = toast.loading("User Register Request...");

    try {
      const { agreement, ...dataWithoutAgreement } = data;

      const res = await register(dataWithoutAgreement).unwrap();

      if (res.success) {
        form.resetFields();
        toast.success("Register Request Send", { id: toastId });
        router.push("/");
        refetch();
      }
    } catch (error: any) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  const userRole = [
    {
      value: "teacher",
      label: "Teacher",
      resDesc: "Teachers will be assigned to various courses.",
    },
    {
      value: "coordinator",
      label: "Coordinator",
      resDesc:
        "Each coordinator is responsible for overseeing the quality and progress of the content development.",
    },
  ];

  return (
    <section className="flex justify-center items-center min-h-screen py-10">
      <div className="border rounded-xl w-full max-w-[550px] shadow-lg p-6">
        <div className="w-full text-center mb-5 md:mb-7">
          <Image className="inline-block w-48 mb-3" src={logo} alt="img" />
          <h5 className="text-xl md:text-2xl font-semibold">Register</h5>
          <p className="text-lg">Send Request for Your Profile.</p>
        </div>

        <Form
          form={form}
          onFinish={onSubmit}
          requiredMark={false}
          layout="vertical"
        >
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="first_name"
                rules={[{ required: true, message: "First Name is required" }]}
              >
                <Input
                  type="text"
                  placeholder="Write here..."
                  className="h-10 border border-[#C4CAD4] !rounded-lg"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="last_name"
                rules={[{ required: true, message: "Last Name is required" }]}
              >
                <Input
                  type="text"
                  placeholder="Write here..."
                  className="h-10 border border-[#C4CAD4] !rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={15}>
            <Col span={14}>
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Email Address is required" },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Write here..."
                  className="h-10 border border-[#C4CAD4] !rounded-lg"
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="Contact No"
                name="contact_no"
                rules={[{ required: true, message: "Contact no is required" }]}
              >
                <Input
                  type="text"
                  placeholder="Write here..."
                  className="h-10 border border-[#C4CAD4] !rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={15}>
            <Col span={12}>
              <Form.Item
                label="Select Course"
                name="course"
                rules={[{ required: true, message: "Course is required" }]}
              >
                <Select
                  loading={isCouLoading}
                  showSearch
                  placeholder="Select from here..."
                  className="[&_.ant-select-selector]:!min-h-10 !h-10 *:!rounded-lg !bg-transparent"
                  options={mapToOptions(courses?.data)}
                  onChange={handleCourseChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Select Subject"
                name="subject"
                rules={[{ required: true, message: "Subject is required" }]}
              >
                <Select
                  loading={isSubLoading}
                  showSearch
                  placeholder="Select from here..."
                  className="[&_.ant-select-selector]:!min-h-10 *:!rounded-lg !bg-transparent"
                  options={mapToOptions(subjects?.data)}
                  disabled={selCourse.length === 0}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={15}>
            <Col span={10}>
              <Form.Item
                label="Select Your Role"
                name="role"
                rules={[{ required: true, message: "User Role is required" }]}
              >
                <Select
                  showSearch
                  placeholder="Select from here..."
                  options={userRole}
                  onChange={(value) => setSelectedRole(value)}
                  className="!h-10 *:!rounded-lg !bg-transparent"
                />
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input.Password
                  type="password"
                  placeholder="Write here..."
                  className="h-10 border border-[#C4CAD4] !rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          {selectedRole ? (
            <Row gutter={15}>
              <Col span={24}>
                <p className="mb-6 text-sm text-accent/70">
                  {
                    userRole.find((role) => role.value === selectedRole)
                      ?.resDesc
                  }
                </p>
              </Col>
            </Row>
          ) : (
            ""
          )}

          <Row>
            <Col span={24}>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Should accept agreement")),
                  },
                ]}
              >
                <Checkbox>
                  I agree to <Link href="#">Terms & Conditions</Link> and
                  <Link href="#"> Privacy Policy</Link>
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <div className="">
                <button
                  className="cursor-pointer text-base font-medium block w-full bg-primary/5 hover:bg-primary text-primary hover:text-white border border-primary/30 hover:border-primary/60 px-4 py-2 rounded-xl transition duration-150"
                  type="submit"
                  disabled={isLoading ? true : false}
                >
                  {isLoading ? "Loading..." : "Register"}
                </button>
              </div>
            </Col>
          </Row>
        </Form>

        <Row>
          <Col span={24}>
            <p className="text-center mt-5">
              Already have an account?
              <Link href="/login"> Login</Link>
            </p>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default SignUpPage;
