import { MenuProps } from "antd";
import { TableColumnsType } from "antd";
import { Dropdown, Button, Popconfirm, Grid } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

export const statusItems: MenuProps["items"] = [
  {
    label: (
      <div className="capitalize text-sm font-medium text-accent flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-600"></span>
        Approve
      </div>
    ),
    key: "approve",
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
      width: 50,
      align: "center",
      render: (_, __: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: "User Full Name",
      dataIndex: "userFullName",
    },
    {
      title: "Course",
      key: "course",
      width: 250,
      render: (_, item: any) => <p className="line-clamp-1">{item?.course}</p>,
    },
    {
      title: "Subject",
      // key: "subject",
      width: 200,
      render: (_, item: any) => <p className="line-clamp-1">{item?.subject}</p>,
    },
    {
      title: "Role",
      dataIndex: "userRole",
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
            disabled={record?.status === "canceled"}
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
                      record?.status === "approve"
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
        { text: "Approve", value: "approve" },
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

export const getUnassignColumns = ({
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
    {
      title: "Q. ID",
      key: "question_id",
      width: 80,
      render: (_, item: any) => <p>{item?.question_id}</p>,
    },
    {
      title: "Question Name",
      dataIndex: "question_name",
      width: 250,
    },
    {
      title: "Question Description",
      dataIndex: "question_desc",
    },
    {
      title: "Course",
      key: "course",
      width: 150,
      render: (_, item: any) => <p className="line-clamp-1">{item?.course}</p>,
    },
    {
      title: "Subject",
      // key: "subject",
      width: 120,
      render: (_, item: any) => <p className="line-clamp-1">{item?.subject}</p>,
    },
    {
      title: "Topic",
      dataIndex: "topic",
      width: 150,
      render: (_, item: any) => <p className="line-clamp-1">{item?.topic}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      width: 100,
      render: (_, item: any) => <p className="line-clamp-1">{item?.status}</p>,
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
