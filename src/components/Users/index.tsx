"use client";
import { useState } from "react";
import { Table } from "antd";
import { toast } from "sonner";
import { getUsersColumns } from "@/utils/AntdTableColumn/Users";

const data = [
  {
    key: "1",
    userFullName: "John Doe",
    userRole: "Admin",
    status: "visited",
    _id: "abc123",
  },
  {
    key: "2",
    userFullName: "Jane Smith",
    userRole: "User",
    status: "pending",
    _id: "def456",
  },
  {
    key: "3",
    userFullName: "Michael Brown",
    userRole: "Moderator",
    status: "canceled",
    _id: "ghi789",
  },
  {
    key: "4",
    userFullName: "Emily Davis",
    userRole: "User",
    status: "visited",
    _id: "jkl012",
  },
  {
    key: "5",
    userFullName: "Chris Johnson",
    userRole: "Admin",
    status: "pending",
    _id: "mno345",
  },
];

const AllUsersList = () => {
  // TODO: type any fix
  const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState<any>();

  //   const [deleteAppointment] = useDeleteAppointmentMutation();
  //   const [updateAppointmentStatus] = useUpdateAppointmentStatusMutation();

  // Delete Appointment
  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Appointment Deleting...");
    try {
      const res = await deleteAppointment(id).unwrap();
      res && toast.success("Appointment Delete Successful", { id: toastId });
    } catch (error) {
      //   onsubmitErrorHandler(error, toastId);
    }
  };

  // Update Status
  const handleUpdateStatus = async (status: string, id: string) => {
    if (status === "visited") {
      // Open add fee modal when status is "visited"
      setIsFeeModalVisible(true);
      setCurrentAddFeeID(id);
    } else {
      // Update when status is not "visited"
      const toastId = toast.loading("Status Updating...");
      try {
        const payload = {
          id,
          data: { status },
        };
        const res = await updateAppointmentStatus(payload).unwrap();
        res && toast.success("Status updated successfully", { id: toastId });
      } catch (error) {
        onsubmitErrorHandler(error, toastId);
      }
    }
  };

  const columns = getUsersColumns({
    handleUpdateStatus,
    handleDelete,
  });

  //   const meta = data?.data?.meta;
  const result = data;

  return (
    <>
      <Table
        columns={columns}
        dataSource={result}
        // scroll={{ x: 1000 }}
        pagination={false}
      />
    </>
  );
};

export default AllUsersList;
