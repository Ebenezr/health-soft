import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import Axios from "../../Api/axios";
import { patientInterface, userInterface } from "../../interfaces/interfaces";
import { motion } from "framer-motion";
import DoctorModal from "../Modals/DoctorModal";
import { useQuery } from "@tanstack/react-query";

function DoctorTBL() {
  async function getData() {
    const { data } = await Axios.get("/doctors");
    return data;
  }
  const {
    data: doctors,
    isLoading,
    refetch,
    error,
  } = useQuery(["doctors"], () => getData());

  const [currentUser, setCurrentUser] = useState<userInterface>({});
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = (id: number) => {
    Axios.delete(`/doctors/${id}`).then((res) => {});
  };

  const handleEdit = (row: userInterface) => {
    setCurrentUser(row);
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
      name: "First Name",
      selector: (row: any) => row?.first_name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row: any) => row?.last_name,
      sortable: true,
    },
    {
      name: "Designation",
      selector: (row: any) => row?.designation,
    },
    {
      name: "Telephone",
      selector: (row: any) => row?.phone,
    },
    {
      name: "Email",
      selector: (row: any) => row?.email,
    },
    {
      name: "Edit",
      button: true,
      cell: (row: any) => (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleEdit(row)}
          className="table-btn edit"
          type="button"
        >
          Edit
        </motion.button>
      ),
    },
    {
      name: "Delete",
      button: true,
      cell: (row: any) => (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="table-btn delete"
          type="button"
          onClick={() => {
            handleDelete(row?.id);
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
        title="Doctor List"
        columns={columns}
        data={doctors}
        dense
        progressPending={isLoading}
      />
      <DoctorModal
        currentUser={currentUser}
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </div>
  );
}

export default DoctorTBL;
