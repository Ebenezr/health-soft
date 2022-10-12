import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import Axios from "../../Api/axios";
import { patientInterface, userInterface } from "../../interfaces/interfaces";
import { motion } from "framer-motion";
import DoctorModal from "../Modals/DoctorModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function DoctorTBL() {
  const queryClient = useQueryClient();
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

  const handleDelete = async (id: number) => {
    await Axios.delete(`/doctors/${id}`).then((res) => {});
  };
  const { mutate: destroy } = useMutation(handleDelete, {
    onMutate: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries(["doctors"]);
    },
  });

  const handleEdit = (row: userInterface) => {
    setCurrentUser(row);
    setOpenModal(true);
  };
  const columns = [
    {
      name: "Serial Number",
      selector: (row: any) => row?.id,
      sortable: true,
      grow: 0.7,
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
            destroy(row?.id);
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
