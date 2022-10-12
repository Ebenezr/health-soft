import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import Axios from "../../Api/axios";
import { appointmentInterface } from "../../interfaces/interfaces";
import { motion } from "framer-motion";
import AppointmentModal from "../Modals/AppointmentModal";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

function AppointmentTable() {
  const [message, setMessage] = useState("");
  //get data
  async function getAppointments() {
    const { data } = await Axios.get("/appointments");
    return data;
  }
  //handle delete
  const handleDelete = async (id: number) => {
    // let deluser = appointments?.filter((user) => user?.id !== id);

    const response = await Axios.delete(`/appointments/${id}`);
    setMessage(response.data);
    refetch;
  };
  //fetch query
  const {
    data: appointments,
    isLoading,
    refetch,
  } = useQuery(["appointments"], () => getAppointments());

  const {
    error,
    isError,
    mutate: deleteData,
  } = useMutation(handleDelete, {
    retry: 3,
  });

  const [currentAppointment, setCurrentAppointment] =
    useState<appointmentInterface>({});
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = (row: appointmentInterface) => {
    setCurrentAppointment(row);
    setOpenModal(true);
  };

  const columns = [
    {
      name: "Id",
      selector: (row: any) => row?.id,
      sortable: true,
      grow: 0,
      right: true,
      style: {
        backgroundColor: "rgba(50, 50, 50, 0.5)",
        color: "white",
      },
    },
    {
      name: "Serial Number",
      selector: (row: any) => row?.serial_no,
    },
    {
      name: "Patient",
      selector: (row: any) => row?.patient?.fullname,
      sortable: true,
    },
    {
      name: "Doctor",
      selector: (row: any) => row?.doctor?.fullname,
      sortable: true,
    },
    {
      name: "Appointment Date",
      selector: (row: any) => row?.appointment_date,
    },
    {
      name: "Appointment Time",
      selector: (row: any) => row?.appointment_time,
    },
    {
      name: "Edit",
      button: true,
      cell: (row: any) => (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="table-btn edit"
          onClick={() => handleEdit(row)}
          type="button"
        >
          Edit
        </motion.button>
      ),
    },
    {
      name: "Delete",
      button: true,
      cell: (row) => (
        <motion.button
          className="table-btn delete"
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            deleteData(row?.id);
            //  handleDelete(row?.id);
          }}
        >
          Delete
        </motion.button>
      ),
    },
  ];

  return (
    <div className="table">
      <DataTable
        title="Appointment List"
        columns={columns}
        data={appointments}
        dense
        progressPending={isLoading}
      />
      <AppointmentModal
        appointment={currentAppointment}
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </div>
  );
}

export default AppointmentTable;
