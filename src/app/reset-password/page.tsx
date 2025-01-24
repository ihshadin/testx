"use client";
import React, { useState } from "react";
import { Col, Divider, Form, Input, InputNumber, Row } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  useChangePasswordMutation,
  useResetPasswordMutation,
} from "@/redux/features/auth/authApi";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import { TResetPassword } from "@/types/user.type";

const ResetPasswordPage = () => {
  const [resetEmail, setResetEmail] = useState("");
  const [form] = Form.useForm();
  const router = useRouter();
  const [resetPassword] = useResetPasswordMutation();
  const [changePassword] = useChangePasswordMutation();

  const handleSendCode = async () => {
    const toastId = toast.loading("Sending code...");

    try {
      const res = await resetPassword({ email: resetEmail }).unwrap();

      if (res?.success) {
        toast.success("Send the Reset Code to admin successfully!", {
          id: toastId,
        });
      }
    } catch (error: any) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  const handleResetPassword = async (data: TResetPassword) => {
    const toastId = toast.loading("Resetting password...");
    const { confirmPassword, ...restData } = data;

    try {
      const res = await changePassword(restData).unwrap();
      if (res?.success) {
        toast.success("Password reset successfully!", { id: toastId });
        router.push("/login");
      }
    } catch (error: any) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen py-10">
      <div className="border rounded-xl w-full max-w-[600px] shadow-lg p-6">
        <p className="text-gray-400 text-xs mb-1">
          Please get the code from Admin. This code will expired in next 60
          minutes.
        </p>
        <div className="flex items-center gap-4">
          <div className="grow">
            <Input
              onChange={(e) => setResetEmail(e.target.value)}
              type="email"
              placeholder="Enter type your email..."
              className="h-10 border border-[#C4CAD4] !rounded-lg"
            />
          </div>
          <button
            onClick={() => handleSendCode()}
            className="shrink-0 cursor-pointer disabled:cursor-not-allowed text-base font-medium bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
            type="submit"
          >
            Send Code to Admin
          </button>
        </div>
        <div>
          <div className="mt-7">
            <Divider
              variant="dashed"
              style={{ borderColor: "#7cb305", fontSize: "20px", margin: "0" }}
              dashed
            >
              Reset Password
            </Divider>
            <p className="text-gray-600 text-sm text-center mt-1">
              Reset your password quickly and securely. Enter the required
              details below to create a new password and regain access to your
              account.
            </p>
            <div className="mt-6">
              <Form
                form={form}
                onFinish={handleResetPassword}
                requiredMark={false}
                layout="vertical"
              >
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      label="Reset Code"
                      name="resetCode"
                      tooltip="Get the code from admin and input here for reset your password"
                      rules={[
                        { required: true, message: "Reset Code is required" },
                      ]}
                    >
                      <InputNumber
                        placeholder="Write here..."
                        className="[&_input]:h-10 h-10 w-full border border-[#C4CAD4] !rounded-lg"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      label="Enter User Email"
                      name="email"
                      //   tooltip="Here you have to input user email."
                      rules={[{ required: true, message: "Email is required" }]}
                    >
                      <Input
                        type="email"
                        placeholder="Write here..."
                        className="h-10 border border-[#C4CAD4] !rounded-lg"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item
                      name="newPassword"
                      label="New Password"
                      rules={[
                        { required: true, message: "Password is required" },
                      ]}
                      hasFeedback
                    >
                      <Input.Password
                        placeholder="Write here..."
                        className="h-10 border border-[#C4CAD4] !rounded-lg"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Confirm Password"
                      name="confirmPassword"
                      dependencies={["newPassword"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Confirm Password is required",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Password not match!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        placeholder="Write here..."
                        className="h-10 border border-[#C4CAD4] !rounded-lg"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <div className="">
                      <button
                        className="cursor-pointer disabled:cursor-not-allowed text-base font-medium block w-full bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
                        type="submit"
                      >
                        Reset Password
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
              <Row>
                <Col span={24}>
                  <div className="mt-5 flex gap-2 items-center justify-between">
                    <p className="text-center">
                      Already have an account?
                      <Link href="/login" className="text-blue-500">
                        {" "}
                        Login
                      </Link>
                    </p>
                    <p className="text-center">
                      Don&apos;t have an account?
                      <Link href="/register" className="text-blue-500">
                        {" "}
                        Register
                      </Link>
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
