import { TCourse } from "@/types/course.type";
import { TQuestion } from "@/types/question.type";
import { TSubject } from "@/types/subject.type";
import { TUser } from "@/types/user.type";
import { MenuProps } from "antd";
import { TableColumnsType } from "antd";
import { Dropdown, Button, Popconfirm } from "antd";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

export const statusItems: MenuProps["items"] = [
  {
    label: (
      <div className="capitalize text-sm font-medium text-accent flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-600"></span>
        Approved
      </div>
    ),
    key: "approved",
  },
  {
    label: (
      <span className="capitalize text-sm font-medium text-accent flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500"></span>
        Reject
      </span>
    ),
    key: "reject",
  },
];

export const getUsersColumns = ({
  handleUpdateStatus,
  handleViewDetails,
  handleDelete,
}: any): TableColumnsType<any> => {
  return [
    {
      title: "SL",
      key: "sl",
      width: 50,
      align: "center",
      render: (_, __: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: "User Full Name",
      key: "user_full_name",
      render: (_, item: any) => (
        <p className="line-clamp-1">
          {item?.first_name + " " + item?.last_name}
        </p>
      ),
    },
    {
      title: "Course",
      key: "course",
      width: 250,
      render: (_, item: any) => (
        <p className="line-clamp-1">{item?.course?.name}</p>
      ),
    },
    {
      title: "Subject",
      key: "subject",
      width: 200,
      render: (_, item: any) => (
        <p className="line-clamp-1">{item?.subject?.name}</p>
      ),
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      width: 130,
    },
    {
      title: "Status",
      key: "status",
      fixed: "right",
      width: 150,
      render: (record: any) => {
        return (
          <Dropdown
            menu={{
              items: statusItems,
              onClick: (data) => handleUpdateStatus(data.key, record?._id),
            }}
            trigger={["click"]}
            disabled={record?.status === "reject"}
          >
            <span>
              <div
                className={`flex items-center justify-between py-1 px-2 capitalize text-sm font-medium text-accent border border-gray-200 rounded-lg ${
                  record?.status === "reject" && "!border-secondary/20"
                }`}
              >
                <p>
                  <span
                    className={`w-2 h-2 rounded-full inline-block mr-2 ${
                      record?.status === "approved"
                        ? "bg-teal-600"
                        : "bg-red-500"
                    }`}
                  ></span>
                  {record?.status}
                </p>
                {record?.status === "reject" || <IoIosArrowDown />}
              </div>
            </span>
          </Dropdown>
        );
      },
      filters: [
        { text: "Approved", value: "approved" },
        { text: "Pending", value: "pending" },
        { text: "Reject", value: "reject" },
      ],
      onFilter: (value, record) => record.status.startsWith(value as string),
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div className="flex justify-center gap-2">
          <Popconfirm
            title="Delete the User"
            description="Are you sure to delete this user?"
            placement="topRight"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button>
              <AiFillDelete fontSize={16} />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
};

export const getUnassignColumns = ({
  handleDelete,
}: any): TableColumnsType<any> => {
  return [
    {
      title: "SL",
      width: 50,
      align: "center",
      render: (_, __: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: "Question Name",
      key: "title",
      width: 250,
      render: (_, item: TQuestion) => (
        <p className="line-clamp-2">{item?.title}</p>
      ),
    },
    {
      title: "Question Description",
      key: "desc",
      render: (_, item: TQuestion) => (
        <p className="line-clamp-2">{item?.desc}</p>
      ),
    },
    {
      title: "Course",
      key: "course",
      width: 150,
      render: (_, item: any) => (
        <p className="line-clamp-2">{item?.course?.name}</p>
      ),
    },
    {
      title: "Subject",
      key: "subject",
      width: 130,
      render: (_, item: any) => (
        <p className="line-clamp-2">{item?.subject?.name}</p>
      ),
    },
    {
      title: "Topic",
      key: "topic",
      width: 170,
      render: (_, item: any) => (
        <p className="line-clamp-2">{item?.topic?.name}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      width: 120,
      render: (_, item: any) => (
        <p className="line-clamp-1 capitalize">{item?.status}</p>
      ),
    },
    {
      title: "Action",
      align: "center",
      fixed: "right",
      width: 80,
      render: (_, record) => (
        <div className="flex justify-center gap-2">
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            placement="topRight"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button>
              <AiFillDelete fontSize={16} />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
};

export const getAssignColumns = ({
  handleDelete,
}: any): TableColumnsType<any> => {
  return [
    {
      title: "SL",
      width: 50,
      align: "center",
      render: (_, __: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: "Teacher",
      key: "teacher",
      width: 150,
      render: (_, item: any) => (
        <p className="line-clamp-1">
          {item?.teacher?.first_name + " " + item?.teacher?.last_name}
        </p>
      ),
    },
    {
      title: "Question Name",
      key: "question_name",
      width: 250,
      render: (_, item: TQuestion) => (
        <p className="line-clamp-2">{item?.title}</p>
      ),
    },
    {
      title: "Question Description",
      key: "question_desc",
      render: (_, item: TQuestion) => (
        <p className="line-clamp-2">{item?.desc}</p>
      ),
    },
    {
      title: "Course",
      key: "course",
      width: 170,
      render: (_, item: any) => (
        <p className="line-clamp-1">{item?.course?.name}</p>
      ),
    },
    {
      title: "Subject",
      key: "subject",
      width: 150,
      render: (_, item: any) => (
        <p className="line-clamp-1">{item?.subject?.name}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      width: 120,
      render: (_, item: any) => (
        <p className="line-clamp-1 capitalize">{item?.status}</p>
      ),
    },
  ];
};

export const getComQuesColumns = ({
  handleAction,
}: any): TableColumnsType<any> => {
  return [
    {
      title: "SL",
      width: 50,
      align: "center",
      render: (_, __: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: "Teacher",
      key: "teacher",
      width: 150,
      render: (_, item: any) => (
        <p className="line-clamp-1">
          {item?.teacher?.first_name + " " + item?.teacher?.last_name}
        </p>
      ),
    },
    {
      title: "Question Name",
      key: "question_name",
      width: 250,
      render: (_, item: TQuestion) => (
        <p className="line-clamp-2">{item?.title}</p>
      ),
    },
    {
      title: "Question Description",
      key: "question_desc",
      render: (_, item: TQuestion) => (
        <p className="line-clamp-2">{item?.desc}</p>
      ),
    },
    {
      title: "Course",
      key: "course",
      width: 170,
      render: (_, item: any) => (
        <p className="line-clamp-1">{item?.course?.name}</p>
      ),
    },
    {
      title: "Subject",
      key: "subject",
      width: 150,
      render: (_, item: any) => (
        <p className="line-clamp-1">{item?.subject?.name}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      width: 120,
      render: (_, item: any) => (
        <p className="line-clamp-1 capitalize">{item?.status}</p>
      ),
    },
    {
      title: "Action",
      align: "center",
      fixed: "right",
      width: 110,
      render: (_, record) => (
        <div className="flex justify-center gap-2">
          <Popconfirm
            title="Mark as Complete"
            description="Are you sure to complete this question?"
            placement="topRight"
            onConfirm={() => handleAction(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Complete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
};

export const getTeachersColumns = ({
  handleAction,
}: any): TableColumnsType<any> => {
  return [
    {
      title: "SL",
      width: 50,
      align: "center",
      render: (_, __: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: "Teacher Full Name",
      key: "teacher",
      render: (_, item: TUser) => (
        <p className="line-clamp-1">
          {item?.first_name + " " + item?.last_name}
        </p>
      ),
    },
    {
      title: "Email Address",
      key: "email_address",
      width: 220,
      render: (_, item: TUser) => <p className="line-clamp-2">{item?.email}</p>,
    },
    {
      title: "Contact Number",
      key: "contact_no",
      width: 180,
      render: (_, item: TUser) => (
        <p className="line-clamp-2">{item?.contact_no}</p>
      ),
    },
    {
      title: "Course",
      key: "course",
      width: 220,
      render: (_, item: any) => (
        <p className="line-clamp-1">{item?.course?.name}</p>
      ),
    },
    {
      title: "Subject",
      key: "subject",
      width: 150,
      render: (_, item: any) => (
        <p className="line-clamp-1">{item?.subject?.name}</p>
      ),
    },
  ];
};

export const getTeaQuesColumns = ({
  handleUpdateStatus,
  handleViewDetails,
  handleDelete,
}: any): TableColumnsType<any> => {
  return [
    {
      title: "SL",
      width: 50,
      align: "center",
      render: (_, __: any, index: number) => <p>{index + 1}</p>,
    },
    // {
    //   title: "Q. ID",
    //   key: "question_id",
    //   width: 80,
    //   render: (_, item: TQuestion) => <p>Q{item?.question_id}</p>,
    // },
    {
      title: "Question Name",
      key: "title",
      width: 300,
      render: (_, item: TQuestion) => (
        <p className="line-clamp-2">{item?.title}</p>
      ),
    },
    {
      title: "Question Description",
      key: "desc",
      render: (_, item: TQuestion) => (
        <p className="line-clamp-2">{item?.desc}</p>
      ),
    },
    {
      title: "Course",
      key: "course",
      width: 150,
      render: (_, item: any) =>
        item?.courses?.map((course: TCourse, index: number) => (
          <p key={index} className="line-clamp-1">
            {course.name}
          </p>
        )),
    },
    {
      title: "Subject",
      key: "subjects",
      width: 120,
      render: (_, item: any) =>
        item?.subjects?.map((subject: TSubject, index: number) => (
          <p key={index} className="line-clamp-1">
            {subject.name}
          </p>
        )),
    },
    {
      title: "Topic",
      width: 150,
      render: (_, item: any) =>
        item?.topics?.map((topic: TCourse, index: number) => (
          <p key={index} className="line-clamp-1">
            {topic.name}
          </p>
        )),
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      width: 120,
      render: (_, item: any) => (
        <p className="line-clamp-1 capitalize">{item?.status}</p>
      ),
    },
    {
      title: "Action",
      align: "center",
      fixed: "right",
      width: 80,
      render: (_, record) => (
        <div className="flex justify-center gap-2">
          <Button>
            <Link href={`/question/${record._id}`}>View</Link>
          </Button>
        </div>
      ),
    },
  ];
};
