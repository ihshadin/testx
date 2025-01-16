"use client";
import React, { useState } from "react";
import { Col, Form, Input, Row, theme } from "antd";
import logo from "@/assets/sites/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";

// const { useToken } = theme;

const SignInPage = () => {
  const { data } = useGetAllCourseQuery(undefined);

  console.log("data--=>", data);

  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Make the login request
      const response = await fetch("/api/v1/user/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      // On success, navigate to the dashboard
      toast.success("Login successful!");
      router.push("/");
    } catch (error: any) {
      // Show error message
      toast.error(error.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen py-10">
      <div className="border rounded-xl w-full max-w-[470px] shadow-lg p-6">
        <div className="w-full text-center mb-5 md:mb-7">
          <Image className="inline-block w-48 mb-3" src={logo} alt="img" />
          <p className="text-lg">Welcome back to our awesome platform</p>
        </div>

        <Form
          form={form}
          onFinish={onSubmit}
          requiredMark={false}
          layout="vertical"
        >
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item
                label="Enter your email"
                name="email"
                // initialValue={"jahidmorol2@gmail.com"}
                tooltip="Here you have to input  your email."
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input
                  type="email"
                  placeholder="Enter type your email..."
                  className="h-10 border border-[#C4CAD4] !rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item
                label="Your Password"
                name="password"
                // initialValue={"Jahid00@11"}
                tooltip="Here you have to input your Password."
                rules={[{ required: true, message: "Password is Required!" }]}
              >
                <Input.Password
                  type="password"
                  placeholder="Enter type your password..."
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
                  disabled={isLoading ? true : false}
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </div>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col span={24}>
            <p className="text-center mt-5">
              Don&apos;t have an account?
              <Link href="/register"> Register Request</Link>
            </p>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default SignInPage;
