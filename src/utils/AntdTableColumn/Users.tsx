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
        Visited
      </div>
    ),
    key: "visited",
  },
  {
    label: (
      <span className="capitalize text-sm font-medium text-accent flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500"></span>
        Cancel
      </span>
    ),
    key: "canceled",
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
      title: "Role",
      dataIndex: "userRole",
      width: 180,
    },
    {
      title: "Status",
      key: "status",
      fixed: "right",
      width: 200,
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
                  record?.status === "canceled" &&
                  "!border-secondary/20 !justify-center"
                }`}
              >
                <p>
                  <span
                    className={`w-2 h-2 rounded-full inline-block mr-2 ${
                      record?.status === "visited"
                        ? "bg-teal-600"
                        : "bg-red-500"
                    }`}
                  ></span>
                  {record?.status}
                </p>
                {record?.status === "canceled" || <IoIosArrowDown />}
              </div>
            </span>
          </Dropdown>
        );
      },
      filters: [
        { text: "Visited", value: "visited" },
        { text: "Pending", value: "pending" },
        { text: "Canceled", value: "canceled" },
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
