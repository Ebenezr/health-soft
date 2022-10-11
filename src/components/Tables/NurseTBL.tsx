import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import Axios from "../../Api/axios";
import { userInterface } from "../../interfaces/interfaces";
import { motion } from "framer-motion";

import NurseModal from "../Modals/NurseModal";
import { useQuery } from "@tanstack/react-query";

function NurseTBL() {
  async function getData() {
    const { data } = await Axios.get("/nurses");
    return data;
  }
  const {
    data: nurses,
    isLoading,
    refetch,
    error,
  } = useQuery(["nurses"], () => getData());

  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<userInterface>({});

  const handleDelete = (id: number) => {
    // let deluser = rows?.filter((user: userInterface) => user?.id !== id);
    // setRows(deluser);
    Axios.delete(`/nurses/${id}`).then((res) => {});
  };

  const handleEdit = (row: userInterface) => {
    setOpenModal(true);
    setCurrentUser(row);
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
          className="table-btn edit"
          type="button"
          onClick={() => handleEdit(row)}
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
        title="Nurse List"
        columns={columns}
        data={nurses}
        dense
        progressPending={isLoading}
      />
      <NurseModal
        currentUser={currentUser}
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </div>
  );
}

export default NurseTBL;
