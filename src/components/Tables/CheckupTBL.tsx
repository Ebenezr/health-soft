import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import Axios from "../../Api/axios";
import { checkupInterface, userInterface } from "../../interfaces/interfaces";
import { motion } from "framer-motion";
import CheckupModal from "../Modals/CheckupModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function CheckupTBL() {
  const queryClient = useQueryClient();
  async function getCheckups() {
    const { data } = await Axios.get("/checkups");
    return data;
  }
  const {
    data: checkups,
    isLoading,
    refetch,
    error,
  } = useQuery(["checkups"], () => getCheckups());

  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<checkupInterface>({});

  const handleDelete = async (id: number) => {
    await Axios.delete(`/checkups/${id}`).then((res) => refetch);
  };

  //handle edit
  const handleEdit = (row: checkupInterface) => {
    setCurrentUser(row);
    setOpenModal(true);
  };

  const { mutate: destroy } = useMutation(handleDelete, {
    onMutate: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries(["checkups"]);
    },
  });

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
      name: "Doctor",
      selector: (row: any) => row?.doctor?.fullname,
      sortable: true,
    },
    {
      name: "Patient",
      selector: (row: any) => row?.patient?.fullname,
      sortable: true,
    },
    {
      name: "Symptoms",
      selector: (row: any) => row?.symptoms,
    },
    {
      name: "Diagnosis",
      selector: (row: any) => row?.diagnosis,
    },
    {
      name: "Check Up Date",
      selector: (row: any) => row?.checkup_date,
    },
    {
      name: "Next Visit",
      selector: (row: any) => row?.next_visit,
    },
    {
      name: "Edit",
      button: true,
      cell: (row: checkupInterface) => (
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
            destroy(row.id);
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
        data={checkups}
        dense
        progressPending={isLoading}
      />
      <CheckupModal
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </div>
  );
}

export default CheckupTBL;
