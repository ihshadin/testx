"use client";
import React, { useState } from "react";
import { Col, Form, Input, Row, theme } from "antd";
import logo from "@/assets/sites/logo.png";
import Image from "next/image";
import Link from "next/link";

const { useToken } = theme;

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = async (data: any) => {
    console.log("submit button is work");
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
                  className="cursor-pointer text-base font-medium block w-full bg-primary/5 hover:bg-primary text-primary hover:text-white border border-primary/30 hover:border-primary/60 px-4 py-2 rounded-xl transition duration-150"
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
