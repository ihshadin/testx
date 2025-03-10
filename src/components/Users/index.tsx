"use client";
import { useState } from "react";
import { Table } from "antd";
import { toast } from "sonner";
import { getUsersColumns } from "@/utils/AntdTableColumn/TableColumns";
import { TableRowSelection } from "antd/es/table/interface";
import {
  useDeleteUserMutation,
  useGetRolesUserQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import onsubmitErrorHandler from "@/utils/errors/onsubmitErrorHandler";
import FilterByCourse from "../Questions/FilterByCourse";
import CustomPagination from "@/utils/Pagination";

const AllUsersList = () => {
  const [params, setParams] = useState<any>([]);

  const { data } = useGetRolesUserQuery(params);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // const rowSelection: TableRowSelection<any> = {
  //   selectedRowKeys,
  //   onChange: (newSelectedRowKeys: React.Key[]) => {
  //     setSelectedRowKeys(newSelectedRowKeys);
  //   },
  // };

  // Delete User
  const handleDelete = async (id: string) => {
    const toastId = toast.loading("User Deleting...");
    try {
      const res = await deleteUser(id).unwrap();
      res && toast.success("User Delete Successful", { id: toastId });
    } catch (error) {
      //   onsubmitErrorHandler(error, toastId);
    }
  };

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

  const handleFilter = (data: Record<string, unknown>) => {
    console.log(data);
    setParams([
      // ...params.filter((param: any) => param?.name === "status"),
      ...Object.entries(data)
        .filter(([, value]) => value)
        .map(([key, value]) => ({ name: key, value })),
    ]);
    console.log(params);
  };

  const columns = getUsersColumns({
    handleUpdateStatus,
    handleDelete,
    meta: data?.meta,
  });

  return (
    <>
      <div className="mb-10">
        <FilterByCourse handleFilter={handleFilter} hideTopic={true} />
      </div>
      <Table
        rowKey={"_id"}
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={data?.data}
        scroll={{ x: 1450 }}
        pagination={false}
      />
      {data?.meta?.totalPage > 1 && (
        <div className="mt-8 lg:mt-12">
          <CustomPagination meta={data?.meta} setParams={setParams} />
        </div>
      )}
    </>
  );
};

export default AllUsersList;
