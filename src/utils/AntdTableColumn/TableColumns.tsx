import { TQuestion } from "@/types/question.type";
import { TUser } from "@/types/user.type";
import { Input, MenuProps } from "antd";
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
  meta,
}: any): TableColumnsType<any> => {
  return [
    {
      title: "SL",
      key: "sl",
      width: 50,
      align: "center",
      render: (_: any, __: any, index: number) =>
        (meta.page - 1) * meta.limit + index + 1,
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
      title: "Email Address",
      dataIndex: "email",
      width: 220,
      // render: (_, item: any) => (
      //   <p className="line-clamp-1">{item?.course?.name}</p>
      // ),
    },
    {
      title: "Contact No",
      dataIndex: "contact_no",
      width: 150,
      // render: (_, item: any) => (
      //   <p className="line-clamp-1">{item?.course?.name}</p>
      // ),
    },
    {
      title: "Course",
      key: "course",
      width: 200,
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
      title: "Role",
      key: "role",
      width: 100,
      render: (_, item: any) => (
        <p className="line-clamp-1 capitalize">{item?.role}</p>
      ),
    },
    {
      title: "Status",
      key: "status",
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
      title: "Reset Code",
      key: "resetCode",
      fixed: "right",
      width: 130,
      render: (_, item: TUser) => (
        <p className="line-clamp-1 capitalize 20">
          {/* {item?.password?.slice(0, 10)} */}
          <Input.Password
            value={item?.resetCode || "..."}
            className="hover:!border-transparent focus:!border-transparent"
            readOnly
          />
        </p>
      ),
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   align: "center",
    //   fixed: "right",
    //   width: 100,
    //   render: (_, record) => (
    //     <div className="flex justify-center gap-2">
    //       <Popconfirm
    //         title="Delete the User"
    //         description="Are you sure to delete this user?"
    //         placement="topRight"
    //         onConfirm={() => handleDelete(record._id)}
    //         okText="Yes"
    //         cancelText="No"
    //       >
    //         <Button>
    //           <AiFillDelete fontSize={16} />
    //         </Button>
    //       </Popconfirm>
    //     </div>
    //   ),
    // },
  ];
};

export const getUnassignColumns = ({
  handleDelete,
  meta,
  getColumnSearchProps,
}: any): TableColumnsType<any> => {
  return [
    {
      title: "SL",
      width: 50,
      align: "center",
      render: (_: any, __: any, index: number) =>
        (meta.page - 1) * meta.limit + index + 1,
    },
    {
      title: "Q. ID",
      dataIndex: "qId",
      key: "qId",
      width: 100,
      sorter: (a: TQuestion, b: TQuestion) => Number(a.qId) - Number(b.qId),
      ...getColumnSearchProps(),
      render: (_, item: TQuestion) => (
        <p className="line-clamp-2">Q{item?.qId}</p>
      ),
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
      title: "View",
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
  meta,
  getColumnSearchProps,
}: any): TableColumnsType<any> => {
  return [
    {
      title: "SL",
      width: 50,
      align: "center",
      render: (_: any, __: any, index: number) =>
        (meta.page - 1) * meta.limit + index + 1,
    },
    {
      title: "Q. ID",
      dataIndex: "qId",
      key: "qId",
      width: 100,
      sorter: (a: TQuestion, b: TQuestion) => Number(a.qId) - Number(b.qId),
      ...getColumnSearchProps(),
      render: (_, item: TQuestion) => (
        <p className="line-clamp-2">Q{item?.qId}</p>
      ),
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

export const getComQuesColumns = ({
  handleAction,
  meta,
}: any): TableColumnsType<any> => {
  return [
    {
      title: "SL",
      width: 50,
      align: "center",
      render: (_: any, __: any, index: number) =>
        (meta.page - 1) * meta.limit + index + 1,
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
  meta,
}: any): TableColumnsType<any> => {
  return [
    {
      title: "SL",
      width: 50,
      align: "center",
      render: (_: any, __: any, index: number) =>
        (meta.page - 1) * meta.limit + index + 1,
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
  meta,
  getColumnSearchProps,
}: any): TableColumnsType<any> => {
  return [
    {
      title: "SL",
      width: 50,
      align: "center",
      render: (_: any, __: any, index: number) =>
        (meta.page - 1) * meta.limit + index + 1,
    },
    {
      title: "Q. ID",
      dataIndex: "qId",
      key: "qId",
      width: 100,
      sorter: (a: TQuestion, b: TQuestion) => Number(a.qId) - Number(b.qId),
      ...getColumnSearchProps(),
      render: (_, item: TQuestion) => (
        <p className="line-clamp-2">Q{item?.qId}</p>
      ),
    },
    {
      title: "Teacher Name",
      key: "title",
      width: 180,
      render: (_, item: any) => (
        <p className="line-clamp-2">
          {item?.teacher?.first_name + " " + item?.teacher?.last_name}
        </p>
      ),
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
      width: 120,
      render: (_, item: any) => (
        <p className="line-clamp-2">{item?.subject?.name}</p>
      ),
    },
    {
      title: "Topic",
      key: "topic",
      width: 150,
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
          <Button>
            <Link href={`/question/${record._id}`}>View</Link>
          </Button>
        </div>
      ),
    },
  ];
};

export const getHoldQuestionsColumns = ({
  meta,
}: any): TableColumnsType<any> => {
  return [
    {
      title: "SL",
      width: 50,
      align: "center",
      render: (_: any, __: any, index: number) =>
        (meta.page - 1) * meta.limit + index + 1,
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
