import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import axios from "axios";
import { appointmentInterface } from "../../interfaces/interfaces";
import { motion } from "framer-motion";
import AppointmentModal from "../Modals/AppointmentModal";

function AppointmentTable() {
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState<appointmentInterface[]>([]);
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
      selector: (row: any) => row.id,
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
      selector: (row: any) => row.serial_no,
    },
    {
      name: "Patient",
      selector: (row: any) => row.patient.fullname,
      sortable: true,
    },
    {
      name: "Doctor",
      selector: (row: any) => row.doctor.fullname,
      sortable: true,
    },
    {
      name: "Appointment Date",
      selector: (row: any) => row.appointment_date,
    },
    {
      name: "Appointment Time",
      selector: (row: any) => row.appointment_time,
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
      cell: () => (
        <motion.button
          className="table-btn delete"
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            alert("mbuss");
          }}
        >
          Delete
        </motion.button>
      ),
    },
  ];

  useEffect(() => {
    try {
      axios
        .get("http://127.0.0.1:3000/appointments")
        .then((res: any) => setRows(res.data))
        .then(() => {
          setPending(false);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="table">
      <DataTable
        title="Appointment List"
        columns={columns}
        data={rows}
        dense
        progressPending={pending}
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
