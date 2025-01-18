"use client";
import { useState } from "react";
import { Table } from "antd";
import { toast } from "sonner";
import { getUsersColumns } from "@/utils/AntdTableColumn/TableColumns";
import { TableRowSelection } from "antd/es/table/interface";
import {
  useGetRolesUserQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import FilterUsers from "./FilterUsers";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";

const AllUsersList = () => {
  const [params, setParams] = useState<any>([]);
  const { data } = useGetRolesUserQuery(params);
  const [updateUser] = useUpdateUserMutation();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  // Delete User
  // const handleDelete = async (id: string) => {
  // const toastId = toast.loading("User Deleting...");
  // try {
  //   const res = await deleteUser(id).unwrap();
  //   res && toast.success("User Delete Successful", { id: toastId });
  // } catch (error) {
  //   //   onsubmitErrorHandler(error, toastId);
  // }
  // };

  // Update Status

  const handleUpdateStatus = async (status: string, id: string) => {
    const toastId = toast.loading("Status Updating...");
    try {
      const payload = {
        id,
        data: { status },
      };

      const res = await updateUser(payload).unwrap();
      res.success &&
        toast.success("Status updated successfully", { id: toastId });
    } catch (error) {
      onsubmitErrorHandler(error, toastId);
    }
  };

  const onSubmit = (data: Record<string, unknown>) => {
    const convertToCustomArray = (filters: any) => {
      return Object.entries(filters)
        .filter(([_, value]: any) => value.length > 0)
        .map(([key, value]) => ({
          name: key,
          value: JSON.stringify(value),
        }));
    };

    setParams(convertToCustomArray(data));
  };

  const columns = getUsersColumns({
    handleUpdateStatus,
    // handleDelete,
  });

  const result = data?.data;

  return (
    <>
      <div className="mb-10">
        <FilterUsers onSubmit={onSubmit} />
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={result}
        pagination={false}
      />
    </>
  );
};

export default AllUsersList;
