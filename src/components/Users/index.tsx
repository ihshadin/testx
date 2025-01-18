"use client";
import { useState } from "react";
import { Table } from "antd";
import { toast } from "sonner";
import { getUsersColumns } from "@/utils/AntdTableColumn/TableColumns";
import { TableRowSelection } from "antd/es/table/interface";
import { useGetRolesUserQuery } from "@/redux/features/user/userApi";
import FilterUsers from "./FilterUsers";

const AllUsersList = () => {
  const [params, setParams] = useState<any>([]);
  const { data } = useGetRolesUserQuery(params);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  // Delete Appointment
  const handleDelete = async (id: string) => {
    // const toastId = toast.loading("Appointment Deleting...");
    // try {
    //   const res = await deleteAppointment(id).unwrap();
    //   res && toast.success("Appointment Delete Successful", { id: toastId });
    // } catch (error) {
    //   //   onsubmitErrorHandler(error, toastId);
    // }
  };

  // Update Status
  const handleUpdateStatus = async (status: string, id: string) => {
    // if (status === "visited") {
    //   // Open add fee modal when status is "visited"
    //   setIsFeeModalVisible(true);
    //   setCurrentAddFeeID(id);
    // } else {
    //   // Update when status is not "visited"
    //   const toastId = toast.loading("Status Updating...");
    //   try {
    //     const payload = {
    //       id,
    //       data: { status },
    //     };
    //     const res = await updateAppointmentStatus(payload).unwrap();
    //     res && toast.success("Status updated successfully", { id: toastId });
    //   } catch (error) {
    //     onsubmitErrorHandler(error, toastId);
    //   }
    // }
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
    handleDelete,
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
