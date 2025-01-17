"use client";
import React, { useState } from "react";
import { Col, Form, Input, Row, Select } from "antd";
import UnassignQuestions from "@/components/Questions/UnassignQuestions";
import QuesAssignFilter from "@/components/Questions/QuesAssignFilter";

const QuestionAssignmentPage = () => {
  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto py-8 px-2">
        <div>
          <QuesAssignFilter onSubmit={onSubmit} />
        </div>
        <div className="mt-10">
          <UnassignQuestions />
        </div>
      </div>
    </section>
  );
};

export default QuestionAssignmentPage;
