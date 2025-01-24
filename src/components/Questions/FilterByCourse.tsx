import React, { useState } from "react";
import { Col, Form, Row, Select } from "antd";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
import { useGetAllSubjectQuery } from "@/redux/features/subject/subjectApi";
import { useGetAllTopicQuery } from "@/redux/features/topic/topicApi";
import { mapToOptions } from "@/utils";

const FilterByCourse = ({
  handleFilter,
  hideTopic,
}: {
  handleFilter: any;
  hideTopic?: boolean;
}) => {
  const [selCourse, setSelCourse] = useState<string>("");
  const [selSubject, setSelSubject] = useState<string>("");
  const [selTopic, setSelTopic] = useState<string>("");
  const [form] = Form.useForm();

  const { data: courses, isLoading: isCouLoading } =
    useGetAllCourseQuery(undefined);
  const { data: subjects, isLoading: isSubLoading } = useGetAllSubjectQuery(
    selCourse && [{ name: "course", value: selCourse }]
  );
  const { data: topics, isLoading: isToLoading } = useGetAllTopicQuery(
    selSubject && [{ name: "subject", value: selSubject }]
  );

  const handleCourseChange = (courseId: string) => {
    form.setFieldsValue({ subject: undefined, topic: undefined });
    setSelCourse(courseId);
    setSelSubject("");
    setSelTopic("");
  };

  const handleSubjectChange = (courseId: string) => {
    form.setFieldsValue({ topic: undefined });
    setSelSubject(courseId);
    setSelTopic("");
  };

  return (
    <>
      <Form
        form={form}
        onFinish={handleFilter}
        requiredMark={false}
        layout="vertical"
      >
        <Row gutter={15} align="bottom">
          <Col span={8}>
            <Form.Item label="Course" name="course" style={{ marginBottom: 0 }}>
              <Select
                loading={isCouLoading}
                showSearch
                placeholder="Select from here..."
                options={mapToOptions(courses?.data)}
                className="[&_.ant-select-selector]:!min-h-10 !h-10 !bg-transparent *:!rounded-lg "
                onChange={handleCourseChange}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label="Subject"
              name="subject"
              style={{ marginBottom: 0 }}
            >
              <Select
                loading={isSubLoading}
                showSearch
                placeholder="Select from here..."
                options={mapToOptions(subjects?.data)}
                className="[&_.ant-select-selector]:!min-h-10 !h-10 !bg-transparent *:!rounded-lg "
                onChange={handleSubjectChange}
                disabled={selCourse.length === 0}
              />
            </Form.Item>
          </Col>
          {hideTopic || (
            <Col span={8}>
              <Form.Item label="Topic" name="topic" style={{ marginBottom: 0 }}>
                <Select
                  loading={isToLoading}
                  showSearch
                  placeholder="Select from here..."
                  options={mapToOptions(topics?.data)}
                  className="[&_.ant-select-selector]:!min-h-10 !h-10 !bg-transparent *:!rounded-lg"
                  disabled={selSubject.length === 0}
                  onChange={(topicsId) => setSelTopic(topicsId)}
                />
              </Form.Item>
            </Col>
          )}

          <Col span={3}>
            <div>
              <button
                className="cursor-pointer disabled:cursor-not-allowed text-base font-medium block w-full bg-primary/5 hover:bg-primary disabled:bg-primary/5 text-primary hover:text-white disabled:text-primary/50 border border-primary/30 hover:border-primary/60 disabled:border-primary//30 px-4 py-1.5 h-10 rounded-lg transition duration-150"
                type="submit"
              >
                Search
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FilterByCourse;
